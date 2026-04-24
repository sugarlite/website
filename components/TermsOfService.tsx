import React from "react";
import { Language } from "../types";
import { APP_NAME } from "../constants";

interface TermsOfServiceProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  lang,
  onNavigate,
}) => {
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
            {isZh ? "服务条款" : "Terms of Service"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isZh
              ? `最后更新于 2026 年 4 月。使用 ${APP_NAME.zh} 即表示您同意本条款。`
              : `Last updated April 2026. Using ${APP_NAME.en} means you agree to these terms.`}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "1. 服务概述" : "1. Service Overview"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? `${APP_NAME.zh} 是一款专为血糖健康管理设计的移动应用程序。本应用提供血糖追踪、数据分析、趋势预报和健康报告等功能，帮助用户更好地管理健康。`
                : `${APP_NAME.en} is a mobile application designed for glucose health management. This app provides glucose tracking, data analysis, trend forecasting, and health reports to help users better manage their wellness.`}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "2. 用户责任" : "2. User Responsibilities"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh ? "您同意：" : "You agree to:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "提供真实、准确和完整的个人信息"
                  : "Provide true, accurate and complete personal information"}
              </li>
              <li>
                {isZh
                  ? "保密您的账户信息和密码"
                  : "Keep your account information and password confidential"}
              </li>
              <li>
                {isZh
                  ? "对您的账户活动负责"
                  : "Be responsible for all account activities"}
              </li>
              <li>
                {isZh
                  ? "遵守所有适用的法律和法规"
                  : "Comply with all applicable laws and regulations"}
              </li>
              <li>
                {isZh
                  ? "不干扰或破坏应用的正常运行"
                  : "Not interfere with or disrupt the normal operation of the app"}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "3. 医学免责声明" : "3. Medical Disclaimer"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "重要提示：本应用不是医疗设备，不能替代专业医学意见。本应用提供的数据和分析仅供参考，不构成医学诊断、治疗建议或处方。请勿依赖本应用进行医疗决策，如有任何健康问题，请咨询合格的医疗专业人员。"
                : "Important Notice: This app is not a medical device and cannot replace professional medical advice. The data and analysis provided by this app are for reference only and do not constitute medical diagnosis, treatment recommendations, or prescriptions. Do not rely on this app for medical decisions. Please consult qualified medical professionals for any health concerns."}
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "4. 知识产权" : "4. Intellectual Property"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "本应用及其所有内容（包括文本、图片、图表和代码）受版权、商标和其他知识产权法保护。您可以为个人使用而下载和使用应用，但不得复制、修改、分发或公开展示任何内容。"
                : "This app and all its content (including text, images, charts, and code) are protected by copyright, trademark, and other intellectual property laws. You may download and use the app for personal use, but may not copy, modify, distribute, or publicly display any content."}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "5. 使用限制" : "5. Usage Restrictions"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh ? "您不得：" : "You may not:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "使用应用进行任何非法目的"
                  : "Use the app for any illegal purpose"}
              </li>
              <li>{isZh ? "骚扰或伤害他人" : "Harass or harm others"}</li>
              <li>
                {isZh
                  ? "试图获得未授权的访问权限"
                  : "Attempt to gain unauthorized access"}
              </li>
              <li>
                {isZh
                  ? "逆向工程或破解应用"
                  : "Reverse engineer or crack the app"}
              </li>
              <li>
                {isZh
                  ? "使用自动化工具抓取数据"
                  : "Use automated tools to scrape data"}
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "6. 免责声明" : "6. Disclaimer of Warranties"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? '本应用按"现状"提供。我们不提供任何明示或暗示的保证，包括但不限于适销性、特定用途的适用性或不侵权的保证。'
                : 'This app is provided "as is". We make no express or implied warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.'}
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "7. 责任限制" : "7. Limitation of Liability"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "在法律允许的最大范围内，我们不对任何间接、附带、特殊或后果性损害（包括数据丧失或业务中断）承担责任。"
                : "To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages (including data loss or business interruption)."}
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh
                ? "8. Apple 健康（HealthKit）使用条款"
                : "8. Apple Health (HealthKit) Terms"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "若您启用 Apple 健康（HealthKit）功能，即表示您同意本应用在您授权范围内访问相关健康数据，用于血糖记录同步、趋势分析和健康管理展示。"
                : "If you enable Apple Health (HealthKit) features, you agree that this app may access related health data within your authorized scope for glucose sync, trend analysis, and health management display."}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 mt-4">
              <li>
                {isZh
                  ? "HealthKit 功能为可选功能，您可自行决定是否授权。"
                  : "HealthKit functionality is optional, and you decide whether to grant permission."}
              </li>
              <li>
                {isZh
                  ? "您可随时在 iOS“健康”应用或系统设置中撤销授权，撤销后本应用将不再访问对应的 HealthKit 数据。"
                  : "You may revoke permission at any time in the iOS Health app or system settings; after revocation, this app will no longer access the corresponding HealthKit data."}
              </li>
              <li>
                {isZh
                  ? "我们不会将 HealthKit 数据用于广告、营销或出售给第三方。"
                  : "We do not use HealthKit data for advertising, marketing, or sale to third parties."}
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "9. 条款修改" : "9. Modification of Terms"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们有权随时修改本条款。修改后的条款在应用上发布后立即生效。您继续使用应用即表示接受修改后的条款。"
                : "We reserve the right to modify these terms at any time. Modified terms become effective immediately upon posting to the app. Your continued use of the app constitutes acceptance of the modified terms."}
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "10. 帐户终止" : "10. Account Termination"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "我们有权随时以任何理由终止您的账户，包括您违反本条款的情况。帐户终止后，您失去访问应用的权限和您存储的所有数据。"
                : "We reserve the right to terminate your account at any time for any reason, including if you violate these terms. Upon account termination, you lose access to the app and all your stored data."}
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "11. 准用法律" : "11. Governing Law"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "本条款应受中华人民共和国法律管辖。任何争议应通过友好协商解决。如协商失败，争议应提交至有管辖权的人民法院。"
                : "These terms are governed by the laws of the People's Republic of China. Any disputes shall be resolved through friendly negotiation. If negotiation fails, disputes shall be submitted to the competent courts."}
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {isZh ? "12. 联系我们" : "12. Contact Us"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isZh
                ? "如果您对本服务条款有任何疑问或意见，请通过以下方式联系我们："
                : "If you have any questions or comments about these Terms of Service, please contact us at:"}
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300">
                📧 {isZh ? "电子邮件" : "Email"}: support@sugarlite.com
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                {isZh ? "客服电话" : "Phone"}: +86-XXX-XXXX-XXXX
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
