import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { StyleSettings } from 'src/index';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	state: StyleSettings;
	initialState: StyleSettings;
	reset: () => void;
	update: (params: StyleSettings) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [paramsState, setParamsState] = useState(props.initialState);
	const rootRef = useRef<HTMLDivElement>(null);

	const onClick = () => {
		isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
	};

	const selectFont = (selectedFont: OptionType) => {
		setParamsState({
			...paramsState,
			font: selectedFont,
		});
	};

	const selectFontSize = (selectedSize: OptionType) => {
		setParamsState({
			...paramsState,
			fontSize: selectedSize,
		});
	};

	const selectFontColor = (selectedColor: OptionType) => {
		setParamsState({
			...paramsState,
			fontColor: selectedColor,
		});
	};

	const selectBgColor = (selectedColor: OptionType) => {
		setParamsState({
			...paramsState,
			bgColor: selectedColor,
		});
	};

	const selectWidth = (selectedWidth: OptionType) => {
		setParamsState({
			...paramsState,
			width: selectedWidth,
		});
	};

	const handleReset = () => {
		props.reset();
		setParamsState(props.initialState);
	};

	const handleSubmit = (e?: SyntheticEvent) => {
		e && e.preventDefault();
		props.update(paramsState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: () => {
			isMenuOpen && setIsMenuOpen(false);
		},
		rootRef: rootRef,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={onClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={rootRef}>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<Text as='h2' size={31} weight={800} uppercase align={'center'}>
						Задайте параметры
					</Text>
					<Select
						selected={paramsState.font}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => selectFont(selected)}
					/>
					<RadioGroup
						name={''}
						options={fontSizeOptions}
						selected={paramsState.fontSize}
						title={'Размер шрифта'}
						onChange={selectFontSize}
					/>
					<Select
						selected={paramsState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => selectFontColor(selected)}
					/>
					<Separator />
					<Select
						selected={paramsState.bgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => selectBgColor(selected)}
					/>
					<Select
						selected={paramsState.width}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => selectWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
