import React from "react";
import { Language } from "../types";
import { APP_NAME } from "../constants";

interface PrivacyPolicyProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang, onNavigate }) => {
  const isZh = lang === "zh";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("home")}
          className="text-brand hover:text-brand-dark transition-colors mb-8 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {isZh ? "返回首页" : "Back to Home"}
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isZh
              ? `最后更新于 2025 年 12 月。${APP_NAME.zh} 致力于保护您的隐私。`
              : `Last updated December 2025. ${APP_NAME.en} is committed to protecting your privacy.`}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "1. 信息收集" : "1. Information Collection"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们收集以下类型的信息来为您提供更好的服务："
                : "We collect the following types of information to provide you with better services:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "个人身份信息（如姓名、电子邮件、电话号码）"
                  : "Personal identification information (such as name, email address, phone number)"}
              </li>
              <li>
                {isZh
                  ? "健康数据（血糖读数、用药记录、医疗历史）"
                  : "Health data (glucose readings, medication history, medical records)"}
              </li>
              <li>
                {isZh
                  ? "设备信息（设备类型、操作系统、应用版本）"
                  : "Device information (device type, operating system, app version)"}
              </li>
              <li>
                {isZh
                  ? "使用数据（应用使用频率、功能使用情况）"
                  : "Usage data (app usage frequency, feature usage patterns)"}
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "2. 信息使用" : "2. Information Usage"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们仅在以下目的下使用收集的信息："
                : "We use the collected information only for the following purposes:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "提供、维护和改进应用功能"
                  : "Provide, maintain and improve application features"}
              </li>
              <li>
                {isZh ? "个性化用户体验" : "Personalize your user experience"}
              </li>
              <li>
                {isZh
                  ? "发送重要通知和更新"
                  : "Send important notifications and updates"}
              </li>
              <li>
                {isZh
                  ? "进行研究和数据分析"
                  : "Conduct research and data analysis"}
              </li>
              <li>
                {isZh
                  ? "遵守法律和监管要求"
                  : "Comply with legal and regulatory requirements"}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "3. 信息安全" : "3. Information Security"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们采用业界标准的安全措施来保护您的个人信息，包括使用 SSL 加密技术和定期安全审计。您的健康数据存储在经过验证的数据中心，并且仅由授权人员访问。"
                : "We use industry-standard security measures to protect your personal information, including SSL encryption and regular security audits. Your health data is stored in verified data centers and accessed only by authorized personnel."}
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "4. 数据共享" : "4. Data Sharing"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们不会出售、租赁或以其他方式将您的个人信息提供给第三方进行营销目的。我们仅在以下情况下共享数据："
                : "We will not sell, rent, or otherwise provide your personal information to third parties for marketing purposes. We share data only in the following cases:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh ? "您明确同意的情况下" : "With your explicit consent"}
              </li>
              <li>{isZh ? "法律要求的情况下" : "As required by law"}</li>
              <li>
                {isZh
                  ? "与受信任的服务提供商进行数据处理"
                  : "For data processing with trusted service providers"}
              </li>
              <li>
                {isZh
                  ? "保护我们的合法权益时"
                  : "To protect our legitimate interests"}
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "5. 您的权利" : "5. Your Rights"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh ? "您有权：" : "You have the right to:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "访问我们保存的关于您的个人数据"
                  : "Access the personal data we store about you"}
              </li>
              <li>
                {isZh
                  ? "请求更正或删除您的数据"
                  : "Request correction or deletion of your data"}
              </li>
              <li>
                {isZh
                  ? "撤回对数据处理的同意"
                  : "Withdraw consent for data processing"}
              </li>
              <li>
                {isZh ? "获取您数据的副本" : "Obtain a copy of your data"}
              </li>
              <li>
                {isZh
                  ? "向相关部门投诉"
                  : "File a complaint with relevant authorities"}
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh
                ? "6. Cookie 和跟踪技术"
                : "6. Cookies and Tracking Technologies"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们使用 Cookie 和类似技术来改进应用体验和分析用户行为。您可以通过浏览器设置控制 Cookie 的使用。"
                : "We use cookies and similar technologies to improve your app experience and analyze user behavior. You can control cookie usage through your browser settings."}
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "7. 政策更新" : "7. Policy Updates"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们可能会定期更新本隐私政策以反映技术、法律或业务的变化。我们会通过应用通知您任何重大更改。"
                : "We may update this privacy policy periodically to reflect changes in technology, law, or business practices. We will notify you of any significant changes through the app."}
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "8. 联系我们" : "8. Contact Us"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "如果您对本隐私政策有任何疑问，请通过以下方式联系我们："
                : "If you have any questions about this privacy policy, please contact us at:"}
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300">
                📧 {isZh ? "电子邮件" : "Email"}: privacy@sugarlite.com
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                {isZh ? "地址" : "Address"}: support@sugarlite.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
