import React from "react";
import styles from "./StyledDropdownButton.module.scss";
import { styleKeyType } from "./types";

export const style = {
	Pretendard: {
		fontFamily: "Pretendard",
	},
	"Nanum Myeangjo": {
		fontFamily: "NanumMyeangjo",
	},
	"Noto Sans": {
		fontFamily: "NotoSans",
	},
	"Nanum Barun Gothic": {
		fontFamily: "NanumBarunGothic",
	},
};

const StyledDropdownButton: React.FC<{
	title: string;
	values: styleKeyType[];
	selectedValue: string | undefined;
	onValueClicked: (value: styleKeyType) => void;
}> = ({ title, values, selectedValue, onValueClicked }) => {
	const dropdownContentClickHandler = (value: styleKeyType) => {
		onValueClicked(value);
	};

	return (
		<>
			<div className="btn-group">
				<button
					className={`btn dropdown-toggle ${styles.button}`}
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{title}
				</button>
				<ul className="dropdown-menu">
					{values.map((value) => (
						<li
							key={value}
							style={style[value]}
							className={`dropdown-item ${styles.dropdownContent} 
                ${
					selectedValue !== undefined && selectedValue === value
						? styles.active
						: undefined
				}`}
							onClick={() => dropdownContentClickHandler(value)}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default StyledDropdownButton;