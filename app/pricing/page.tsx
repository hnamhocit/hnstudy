"use client"

import { Card, CardBody, Button, Badge } from '@heroui/react'
import { Check, X, Star, Crown, Zap, Cloud, Shield, Globe, Infinity } from 'lucide-react'
import DefaultLayout from '@/layouts/DefaultLayout'

export default function PricingPage() {
  const plans = [
    {
      name: "Miễn phí",
      price: "0",
      period: "mãi mãi",
      description: "Dành cho người mới bắt đầu",
      icon: <Star className="w-8 h-8 text-gray-400" />,
      popular: false,
      features: [
        { text: "Tối đa 100 flashcards", included: true },
        { text: "5 bộ flashcards", included: true },
        { text: "Pomodoro cơ bản", included: true },
        { text: "Ghi chú cơ bản", included: true },
        { text: "Quảng cáo", included: true },
        { text: "Lưu trữ 100MB", included: true },
        { text: "Chia sẻ công khai", included: false },
        { text: "Thống kê nâng cao", included: false },
        { text: "Không giới hạn flashcards", included: false },
        { text: "Export dữ liệu", included: false }
      ]
    },
    {
      name: "Plus",
      price: "49,000",
      period: "tháng",
      description: "Dành cho học sinh, sinh viên",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      popular: true,
      features: [
        { text: "Không giới hạn flashcards", included: true },
        { text: "50 bộ flashcards", included: true },
        { text: "Pomodoro nâng cao", included: true },
        { text: "Ghi chú đa dạng", included: true },
        { text: "Không quảng cáo", included: true },
        { text: "Lưu trữ 5GB", included: true },
        { text: "Chia sẻ công khai", included: true },
        { text: "Thống kê nâng cao", included: true },
        { text: "Export dữ liệu", included: true },
        { text: "Hỗ trợ 24/7", included: false }
      ]
    },
    {
      name: "Premium",
      price: "99,000",
      period: "tháng",
      description: "Dành cho người học chuyên nghiệp",
      icon: <Crown className="w-8 h-8 text-yellow-500" />,
      popular: false,
      features: [
        { text: "Không giới hạn flashcards", included: true },
        { text: "Không giới hạn bộ flashcards", included: true },
        { text: "Pomodoro AI", included: true },
        { text: "Ghi chú nâng cao", included: true },
        { text: "Không quảng cáo", included: true },
        { text: "Lưu trữ không giới hạn", included: true },
        { text: "Chia sẻ & cộng tác", included: true },
        { text: "Thống kê AI", included: true },
        { text: "Export đa định dạng", included: true },
        { text: "Hỗ trợ 24/7 VIP", included: true }
      ]
    }
  ]

  const features = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Lưu trữ mở rộng",
      description: "Từ 100MB đến không giới hạn tùy gói"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Không quảng cáo",
      description: "Tập trung học tập không bị làm phiền"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Chia sẻ không giới hạn",
      description: "Chia sẻ kiến thức với cộng đồng"
    },
    {
      icon: <Infinity className="w-6 h-6" />,
      title: "Không giới hạn flashcards",
      description: "Thoải mái tạo và học mọi lúc"
    }
  ]

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Chọn Gói Phù Hợp
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nâng cấp trải nghiệm học tập của bạn với các gói dịch vụ cao cấp
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all hover:scale-105 ${plan.popular
                ? 'border-blue-500 shadow-2xl'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              {plan.popular && (
                <Badge
                  color="primary"
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  Phổ biến nhất
                </Badge>
              )}

              <CardBody className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}₫
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`text-sm ${feature.included
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 line-through'
                        }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  fullWidth
                  color={plan.popular ? "primary" : "default"}
                  variant={plan.popular ? "solid" : "bordered"}
                  className={plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                >
                  {plan.price === "0" ? 'Bắt đầu miễn phí' : 'Nâng cấp ngay'}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardBody className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              So Sánh Tính Năng
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 font-semibold text-gray-900 dark:text-white">
                      Tính năng
                    </th>
                    {plans.map((plan, index) => (
                      <th key={index} className="text-center py-4 font-semibold text-gray-900 dark:text-white">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((_, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4 text-gray-700 dark:text-gray-300">
                        {plans[0].features[featureIndex].text}
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td key={planIndex} className="text-center py-4">
                          {plan.features[featureIndex].included ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardBody className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardBody className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Câu Hỏi Thường Gặp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Có thể hủy gói bất cứ lúc nào?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Có, bạn có thể hủy gói Premium/Plus bất cứ lúc nào và vẫn sử dụng đến hết kỳ đã thanh toán.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Có dùng thử không?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Có! Gói Plus và Premium đều có 7 ngày dùng thử miễn phí.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Thanh toán như thế nào?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chấp nhận thẻ ngân hàng, ví điện tử (Momo, ZaloPay) và chuyển khoản.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Có hoàn tiền không?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Có chính sách hoàn tiền trong 14 ngày nếu không hài lòng với dịch vụ.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  )
}
