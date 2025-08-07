import { useRef, useEffect } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";
import eyeAnimation from "@/../public/animation/eye.json";

interface PasswordEyeIconProps {
	showPassword: boolean;
	onClick: () => void;
	className?: string;
}

export default function PasswordEyeIcon({
	showPassword,
	onClick,
	className = "w-6 h-6",
}: PasswordEyeIconProps) {
	const lottieRef = useRef<LottieRefCurrentProps>(null);

	useEffect(() => {
		if (lottieRef.current) {
			lottieRef.current.goToAndStop(showPassword ? 0 : 20, true);
		}
	}, [showPassword]);

	const handleClick = () => {
		if (lottieRef.current) {
			if (showPassword) {
				lottieRef.current.playSegments([0, 20], true);
			} else {
				lottieRef.current.playSegments([20, 0], true);
			}
		}
		onClick();
	};

	return (
		<button
			type="button"
			className={`absolute right-3 top-1/2 -translate-y-1/2 text-xl ${className}`}
			onClick={handleClick}
			tabIndex={-1}
			aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
		>
			<Lottie
				lottieRef={lottieRef}
				animationData={eyeAnimation}
				loop={false}
				autoplay={false}
				className={`${className} + password-eye-icon`}
			/>
		</button>
	);
}
