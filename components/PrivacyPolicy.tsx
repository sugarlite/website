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
              ? `最后更新于 2026 年 4 月。${APP_NAME.zh} 致力于保护您的隐私。`
              : `Last updated April 2026. ${APP_NAME.en} is committed to protecting your privacy.`}
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
              {isZh ? "7. Apple 健康（HealthKit）说明" : "7. Apple Health (HealthKit) Notice"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "本应用支持与 Apple 健康（HealthKit）集成。相关功能会在应用内明确标注为“Apple 健康同步”或类似名称，并仅在您主动授权后读取或写入健康数据。"
                : 'This app supports integration with Apple Health (HealthKit). Related features are clearly labeled in the app as "Apple Health Sync" or similar, and health data is read or written only after you explicitly grant permission.'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "我们可能会在您授权后读取或写入与血糖管理相关的数据（例如血糖记录等）。"
                  : "After authorization, we may read or write data related to glucose management (such as glucose records)."}
              </li>
              <li>
                {isZh
                  ? "HealthKit 数据仅用于在应用内展示、分析与健康管理功能，不用于广告、营销或画像。"
                  : "HealthKit data is used only for in-app display, analysis, and health management features, and is not used for advertising, marketing, or profiling."}
              </li>
              <li>
                {isZh
                  ? "除非获得您的明确同意或法律要求，我们不会向第三方出售或共享您的 HealthKit 数据。"
                  : "Unless required by law or with your explicit consent, we do not sell or share your HealthKit data with third parties."}
              </li>
              <li>
                {isZh
                  ? "您可以随时在 iOS 系统“健康”应用或“设置 > 隐私与安全性 > 健康”中管理或撤销授权。"
                  : 'You can manage or revoke permissions at any time in the iOS Health app or in "Settings > Privacy & Security > Health".'}
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "8. 政策更新" : "8. Policy Updates"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们可能会定期更新本隐私政策以反映技术、法律或业务的变化。我们会通过应用通知您任何重大更改。"
                : "We may update this privacy policy periodically to reflect changes in technology, law, or business practices. We will notify you of any significant changes through the app."}
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "9. 联系我们" : "9. Contact Us"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "如果您对本隐私政策有任何疑问，请通过以下方式联系我们："
                : "If you have any questions about this privacy policy, please contact us at:"}
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
