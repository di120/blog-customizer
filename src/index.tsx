import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type StyleSettings = {
	font: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	width: OptionType;
}

const App = () => {
	const initialState: StyleSettings = {
		font: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		width: defaultArticleState.contentWidth
	};

	const [state, setState] = useState(initialState);

	const resetStyle = () => {
		setState(initialState);
	}

	const updateStyle = (params: StyleSettings) => {
		setState(params);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.font.value,
					'--font-size': state.fontSize.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.width.value,
					'--bg-color': state.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm state={state} initialState={initialState} reset={resetStyle} update={updateStyle} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
