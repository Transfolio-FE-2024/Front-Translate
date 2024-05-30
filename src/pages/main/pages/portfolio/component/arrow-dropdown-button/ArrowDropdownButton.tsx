import React from "react";
import styles from "./ArrowDropdownButton.module.scss";

type StyleType = {
	[key: string]: {
		[cssKey: string]: string;
	};
};

const style: StyleType = {
	"14pt": { fontSize: "14px" },
	"16pt": { fontSize: "16px" },
	"18pt": { fontSize: "18px" },
	"20pt": { fontSize: "20px" },
	Pretendard: { fontFamily: "Pretendard" },
	"Nanum Myeangjo": { fontFamily: "NanumMyeongjo" },
	"Noto sans": { fontFamily: "NotoSans" },
	"Nanum Barun Gothic": { fontFamily: "NanumBarunGothic" },
};

const ArrowDropdownButton: React.FC<{
	title: string;
	values: string[];
	selectedValue: string | null;
	onValueClicked: (value: string) => void;
}> = ({ title, values, selectedValue, onValueClicked }) => {
	const dropdownContentClickHandler = (value: string) => {
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
					{values.map((value, index) => (
						<li
							style={
								Object.keys(style).includes(value)
									? style[value]
									: {}
							}
							className={`dropdown-item ${styles.dropdownContent} 
                ${selectedValue === value ? styles.active : null}`}
							onClick={() => dropdownContentClickHandler(value)}
							key={index}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default ArrowDropdownButton;
