import React, { ReactNode } from "react";
import {ButtonContainer, ButtonModal, ModalBackdrop, ModalContainer} from "./style";




interface ModalProps {
	children: ReactNode;
	shown: boolean;
	close: () => void;
	fun?: () => void;
	buttonName?: string
}

export function Modal({ children, shown, close, fun, buttonName}: ModalProps) {
	return shown ? (
		<ModalBackdrop
			onClick={() => {
				close();
			}}
		>
			<ModalContainer
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{children}
				<ButtonContainer>
				<ButtonModal onClick={close}>
					Close
				</ButtonModal>
					{buttonName && buttonName.length > 0 && (
						<ButtonModal onClick={fun}>{buttonName}</ButtonModal>
					)}
				</ButtonContainer>

			</ModalContainer>
		</ModalBackdrop>
	) : null;
}
