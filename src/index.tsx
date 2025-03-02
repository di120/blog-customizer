import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

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
};

const App = () => {
	const initialState: StyleSettings = {
		font: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		width: defaultArticleState.contentWidth,
	};

	const [articleState, setArticleState] = useState(initialState);

	const resetStyle = () => {
		setArticleState(initialState);
	};

	const updateStyle = (params: StyleSettings) => {
		setArticleState(params);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.font.value,
					'--font-size': articleState.fontSize.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.width.value,
					'--bg-color': articleState.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				state={articleState}
				initialState={initialState}
				reset={resetStyle}
				update={updateStyle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
