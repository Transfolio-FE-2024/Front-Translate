import PageTitle from "@/components/page-title/PageTitle";
import styles from "./Portfolio.module.scss";
import ThumbnailChangeable from "./component/thumbnail-changeable/ThumbnailChangeable";
import { useState } from "react";
import TextField from "@/components/text-field/TextField";
import { VscArrowSwap } from "react-icons/vsc";
import DropdownButton from "./component/dropdown-button/DropdownButton";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import { RiErrorWarningLine } from "react-icons/ri";
import ArrowDropdownButton from "./component/arrow-dropdown-button/ArrowDropdownButton";
import GreyButtonSquare from "@/components/button/grey-button-square/GreyButtonSquare";
import MainButtonSquare from "@/components/button/main-button-square/MainButtonSquare";
import WritingContent from "./component/writing-content/WritingContent";

const languageList = ["한국어", "영어", "일본어", "아랍어", "불어"];
const fontSizeList = ["14pt", "16pt", "18pt", "20pt"];
const fontFamilyList = [
	"Pretendard",
	"Nanum Myeangjo",
	"Noto sans",
	"Nanum Barun Gothic",
];
const Portfolio = () => {
	const [title, setTitle] = useState<string>("");
	const [information, setInformation] = useState<string>("");
	const [selectedOriginLanguage, setSelectedOriginLanguage] = useState<
		string | null
	>(null);
	const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] =
		useState<string | null>(null);
	const [selectedMainCatetory, setSelectedMainCategory] = useState<
		string | null
	>(null);
	const [selectedSubCatetory, setSelectedSubCategory] = useState<
		string | null
	>(null);
	const [selectedFontSize, setSelectedFontSize] = useState<string | null>(
		null
	);
	const [selectedFontFamily, setSelectedFontFamily] = useState<string | null>(
		null
	);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<PageTitle
						mainTitle={"Translator"}
						subTitle={"고전시 번역 프리랜서"}
					/>
					<div className={styles.divider}></div>
					<div className={styles.thumbnailSection}>
						<div className={styles.thumbnailCardSection}>
							<ThumbnailChangeable title={title} />
						</div>
						<div className={styles.thumbnailInfoSection}>
							<div className={styles.titleTextFieldSection}>
								<TextField
									value={title}
									onChange={(value) => setTitle(value)}
									placeholder="제목을 입력해주세요"
								/>
								<div className={styles.titleDateSection}>
									2023.12.12
								</div>
							</div>
							<div className={styles.selectLanguageSection}>
								<div className={styles.dropdownSection}>
									<DropdownButton
										title={
											selectedOriginLanguage === null
												? "언어 선택"
												: selectedOriginLanguage
										}
										values={languageList}
										selectedValue={selectedOriginLanguage}
										onValueClicked={(value) =>
											setSelectedOriginLanguage(value)
										}
									/>
								</div>
								<VscArrowSwap className={styles.arrowIcon} />
								<div className={styles.dropdownSection}>
									<DropdownButton
										title={
											selectedTranslatedLanguage === null
												? "언어 선택"
												: selectedTranslatedLanguage
										}
										values={languageList}
										selectedValue={
											selectedTranslatedLanguage
										}
										onValueClicked={(value) =>
											setSelectedTranslatedLanguage(value)
										}
									/>
								</div>
								{(selectedOriginLanguage !== null ||
									selectedTranslatedLanguage !== null) &&
									selectedOriginLanguage ===
										selectedTranslatedLanguage && (
										<div className={styles.warnTextSection}>
											<RiErrorWarningLine
												className={styles.warnIcon}
											/>
											같은 언어는 선택할 수 없습니다.
										</div>
									)}
							</div>
							<div className={styles.infoTextFieldSection}>
								<TextFieldLonger
									value={information}
									onChange={(value) => setInformation(value)}
									placeholder="작품 설명을 입력해주세요. (200자)"
									maxLength={200}
								/>
							</div>
							<div className={styles.etcSection}>
								<div className={styles.etcTitleSection}>
									대분류
								</div>
								<div className={styles.dropdownSection}>
									<DropdownButton
										title={
											selectedMainCatetory === null
												? "대분류"
												: selectedMainCatetory
										}
										values={languageList}
										selectedValue={selectedMainCatetory}
										onValueClicked={(value) =>
											setSelectedMainCategory(value)
										}
									/>
								</div>
								<div className={styles.etcTitleSection}>
									소분류
								</div>
								<div className={styles.dropdownSection}>
									<DropdownButton
										title={
											selectedSubCatetory === null
												? "소분류"
												: selectedSubCatetory
										}
										values={languageList}
										selectedValue={selectedSubCatetory}
										onValueClicked={(value) =>
											setSelectedSubCategory(value)
										}
									/>
								</div>
							</div>
							<div className={styles.etcSection}>
								<div className={styles.etcTitleSection}>
									작가
								</div>
								<div className={styles.divider}></div>
								<div className={styles.etcTitleSection}>
									@kimhim
								</div>
							</div>
						</div>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.writingSection}>
						<div className={styles.buttonsSection}>
							<div className={styles.buttonSection}>
								<ArrowDropdownButton
									title={
										selectedFontSize === null
											? "글자 크기"
											: selectedFontSize
									}
									values={fontSizeList}
									selectedValue={selectedFontSize}
									onValueClicked={(value) =>
										setSelectedFontSize(value)
									}
								/>
							</div>
							<div className={styles.buttonSection}>
								<ArrowDropdownButton
									title={
										selectedFontFamily === null
											? "서체 설정"
											: selectedFontFamily
									}
									values={fontFamilyList}
									selectedValue={selectedFontFamily}
									onValueClicked={(value) =>
										setSelectedFontFamily(value)
									}
								/>
							</div>
						</div>
						<WritingContent />
						<div className={styles.mainButtonsSection}>
							<div className={styles.mainButtonSection}>
								<GreyButtonSquare
									title="임시 저장"
									onClicked={() => {}}
								/>
							</div>
							<div className={styles.mainButtonDivider}></div>
							<div className={styles.mainButtonSection}>
								<MainButtonSquare
									title="제출하기"
									onClicked={() => {}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Portfolio;
