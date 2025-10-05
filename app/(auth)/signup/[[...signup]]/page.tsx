import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
			<div className="w-full max-w-md">
				<SignUp
					appearance={{
						baseTheme: undefined, // This removes any default Clerk theming
						elements: {
							rootBox: "w-full",
							card: "!bg-white !shadow-lg !rounded-lg !border !border-gray-200",
							headerTitle: "!text-2xl !font-bold !text-gray-900",
							headerSubtitle: "!text-gray-600",
							formFieldLabel: "!text-gray-700 !text-sm !font-medium",
							formFieldInput:
								"!w-full !px-3 !py-2 !border !border-gray-300 !rounded-md !shadow-sm focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !text-gray-900",
							formButtonPrimary:
								"!w-full !bg-blue-600 hover:!bg-blue-700 !text-white !font-medium !py-2 !px-4 !rounded-md !shadow-sm",
							footerActionText: "!text-gray-600 !text-sm",
							footerActionLink:
								"!text-blue-600 hover:!text-blue-800 !font-medium",
							socialButtonsBlockButton:
								"!border !border-gray-300 !bg-white hover:!bg-gray-50 !text-gray-700",
							socialButtonsBlockButtonText: "!text-gray-700",
							dividerLine: "!bg-gray-200",
							dividerText: "!text-gray-500 !text-sm",
							formHeaderTitle: "!text-gray-900 !text-2xl !font-bold",
							formHeaderSubtitle: "!text-gray-600 !text-sm",
							identityPreviewEditButton: "!text-blue-600 hover:!text-blue-800",
							formResendCodeLink: "!text-blue-600 hover:!text-blue-800",
							otpCodeFieldInput: "!text-2xl !tracking-widest !text-gray-900",
							otpCodeFieldInputs: "!gap-2",
						},
						variables: {
							colorPrimary: "#2563eb", // blue-600
							colorBackground: "#ffffff",
							colorText: "#111827", // gray-900
							colorTextSecondary: "#4b5563", // gray-600
							colorTextOnPrimaryBackground: "#ffffff",
						},
					}}
				/>
			</div>
		</div>
	);
}
