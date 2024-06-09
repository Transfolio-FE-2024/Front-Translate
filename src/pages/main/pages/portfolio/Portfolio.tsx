import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Portfolio.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import TextField from "@/components/text-field/TextField";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import GreyButtonSquare from "@/components/button/grey-button-square/GreyButtonSquare";
import MainButtonSquare from "@/components/button/main-button-square/MainButtonSquare";
import ThumbnailChangeable from "./component/thumbnail-changeable/ThumbnailChangeable";
import DropdownButton from "./component/dropdown-button/DropdownButton";
import StyledDropdownButton from "./component/styled-dropdown-button/StyledDropdownButton";
import WritingContent from "./component/writing-content/WritingContent";
import StyledTitle from "./component/styled-title/StyledTitle";
import { VscArrowSwap } from "react-icons/vsc";
import { RiErrorWarningLine } from "react-icons/ri";
import {
	areaOfInterest,
	fontFamilys,
	fontSizes,
	fontFamily,
} from "@/util/const";
import { FontFamilyType, MainCategoryType, ContentType } from "@/types/index";


const Portfolio = () => {
	const indexRef = useRef<number>(1);
	const [contents, setContents] = useState<ContentType[]>([{
		id: indexRef.current++,
		focused: true,
		original: "",
		translated: "",
	}]);
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("");
	const [_1, setTitleFontFamily] = useState<
		string | undefined
	>();
	const [information, setInformation] = useState<string>("");
	const [selectedOriginLanguage, setSelectedOriginLanguage] = useState<
		string | undefined
	>();
	const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] =
		useState<string | undefined>(undefined);
	const [selectedMainCatetory, setSelectedMainCategory] = useState<
		MainCategoryType | undefined
	>();
	const [selectedSubCatetory, setSelectedSubCategory] = useState<
		string | undefined
	>();
	const [selectedFontSize, setSelectedFontSize] = useState<
		string | undefined
	>();
	const [selectedFontFamily, setSelectedFontFamily] = useState<
		FontFamilyType | undefined
	>();

	useEffect(() => {
		window.scrollTo(0,0)
	}, [])

	const offFocus = useCallback(() => {
		setContents(_contents => _contents.map((content) => ({
			...content,
			focused: false
		})));
	}, []);

	const deleteContent = useCallback((index: number) => () => contents.length !== 1 ? setContents(contents.filter((_1, _index) => index !== _index)) : null, [contents])

	const moveNextContent = useCallback((index: number) => () => {
		if (index + 1 === contents.length) {
			const newContent = {
				id: indexRef.current++,
				focused: true,
				original: "",
				translated: "",
			}

			const temp = contents.map(content => ({ ...content, focused: false }));
			setContents([...temp, newContent]);
		} else {
			const temp = contents.map((content, contentIndex) => ({
				...content,
				focused: index + 1 === contentIndex
			}))
			setContents(temp);
		}
	}, [contents])

	const setOriginal = useCallback((index: number) => (original: string) =>
		setContents(contents.map((_content, _index) => (index === _index ? {
			..._content,
			original
		} : _content))), [contents]);

	const setTranslated = useCallback((index: number) => (translated: string) =>
		setContents(contents.map((_content, _index) => (index === _index ? {
			..._content,
			translated
		} : _content))), [contents]);


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
							<ThumbnailChangeable
								title={title}
								changeTitleFontFamily={(
									titleFontFamily: string
								) => setTitleFontFamily(titleFontFamily)}
							/>
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
											selectedOriginLanguage === undefined
												? "언어 선택"
												: selectedOriginLanguage
										}
										values={areaOfInterest["언어"]}
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
											selectedTranslatedLanguage ===
												undefined
												? "언어 선택"
												: selectedTranslatedLanguage
										}
										values={areaOfInterest["언어"]}
										selectedValue={
											selectedTranslatedLanguage
										}
										onValueClicked={(value) =>
											setSelectedTranslatedLanguage(value)
										}
									/>
								</div>
								{(selectedOriginLanguage !== undefined ||
									selectedTranslatedLanguage !== undefined) &&
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
											selectedMainCatetory === undefined
												? "대분류"
												: selectedMainCatetory
										}
										values={Object.keys(areaOfInterest)}
										selectedValue={selectedMainCatetory}
										onValueClicked={(value) =>
											setSelectedMainCategory(
												value as
												MainCategoryType
												| undefined
											)
										}
									/>
								</div>
								<div className={styles.etcTitleSection}>
									소분류
								</div>
								<div className={styles.dropdownSection}>
									<DropdownButton
										title={
											selectedSubCatetory === undefined
												? "소분류"
												: selectedSubCatetory
										}
										values={
											selectedMainCatetory !== undefined
												? areaOfInterest[
												selectedMainCatetory
												]
												: []
										}
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
								<DropdownButton
									title={<StyledTitle>글자 크기</StyledTitle>}
									values={fontSizes}
									selectedValue={selectedFontSize}
									onValueClicked={(value) =>
										setSelectedFontSize(value)
									}
								/>
							</div>
							<div className={styles.buttonSection}>
								<StyledDropdownButton
									title={<StyledTitle>서체 설정</StyledTitle>}
									values={fontFamilys}
									selectedValue={selectedFontFamily}
									onValueClicked={(value) =>
										setSelectedFontFamily(value)
									}
								/>
							</div>
						</div>
						<WritingContent
							contents={contents}
							fontSize={selectedFontSize}
							fontFamily={
								selectedFontFamily === undefined
									? undefined
									: fontFamily[selectedFontFamily]
							}
							offFocus={offFocus}
							deleteContent={deleteContent}
							moveNextContent={moveNextContent}
							setOriginal={setOriginal}
							setTranslated={setTranslated}
						/>
						<div className={styles.mainButtonsSection}>
							<div className={styles.mainButtonSection}>
								<GreyButtonSquare
									title="임시 저장"
									onClicked={() => { }}
								/>
							</div>
							<div className={styles.mainButtonDivider}></div>
							<div className={styles.mainButtonSection}>
								<MainButtonSquare
									title="제출하기"
									onClicked={() => {
										navigate("/home/completion")
									}}
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
