import {v4 as uuidv4} from "uuid";

import {ICard} from "@/interfaces";

export interface IFullCard extends Omit<ICard, 'id'> {
}

export const createNewCard = (
    deckId: string,
    front: string,
    back: string
): ICard => {
    const now = new Date();

    return {
        id: uuidv4(),
        deckId: deckId,
        front: front,
        back: back,

        // Spaced Repetition Defaults (Cho thẻ mới)
        nextReviewDate: now, // Hẹn ôn tập *ngay lập tức*
        interval: 0,         // 0 ngày (chưa ôn)
        easeFactor: 2.5,     // Độ dễ tiêu chuẩn (250%)
        repetitions: 0,      // 0 lần ôn tập thành công

        createdAt: now,
        updatedAt: now,
    };
};

export const createEmptyCard = (deckId: string): ICard => {
    return createNewCard(deckId, "", "");
};