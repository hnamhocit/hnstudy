import { Button, Checkbox, Image, Input } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { auth, db } from "@/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [firebaseError, setFirebaseError] = useState<null | string>(null)

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      const username = user.displayName || user.email!.split('@')[0];

      await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        username: username,
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setFirebaseError(null);
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (signInError: any) {

      if (signInError.code === 'auth/user-not-found') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          await createUserDocument(userCredential.user);
        } catch (signUpError: any) {
          setFirebaseError(signUpError.message);
        }

      } else if (signInError.code === 'auth/wrong-password') {
        setFirebaseError("Sai mật khẩu, vui lòng thử lại.");
      } else {
        setFirebaseError(signInError.message);
      }
    }
  };

  const handleAuthWithGoogle = async () => {
    setFirebaseError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await createUserDocument(result.user);

    } catch (error: any) {
      setFirebaseError(error.message);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 bg-center bg-no-repeat bg-cover" style={{
        backgroundImage: 'url("https://res.cloudinary.com/jerrick/image/upload/v1509742245/q0l5lwzd91liplir3odz.jpg")'
      }}></div>

      <div className="flex items-center justify-center shrink-0 w-120">
        <div className="flex flex-col gap-12 max-w-80">
          <div className="text-center space-y-3">
            <div className="text-3xl font-bold">hnstudy</div>
            <div>"Hãy học như thể bạn sẽ sống mãi mãi; hãy sống như thể bạn sẽ chết vào ngày mai." — <span className="font-semibold italic">Mahatma Gandhi</span></div>
          </div>

          <div className="p-4 rounded-2xl space-y-7">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <Input
                label="Email"
                variant="bordered"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
              />


              <Input
                label="Password"
                variant="bordered"
                type="password"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register("password")}
              />


              <Button type="submit" fullWidth color="primary">Continue</Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-0.5 bg-gray-700"></div>
              <div className="shrink-0">OR</div>
              <div className="flex-1 h-0.5 bg-gray-700"></div>
            </div>

            <Button onPress={handleAuthWithGoogle} startContent={
              <Image src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" width={24} height={24} />
            } fullWidth radius="full">Google</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form;
