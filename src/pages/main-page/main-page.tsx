import React, { useEffect, useState } from 'react';

import styles from './main-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMainPageContent } from '@redux/mainPageSlice';
import { AppDispatch, RootState } from '@redux/configure-store';
import { useUniqueTags } from './hooks';
import { CONSTANTS } from './constants';
import { MainContent } from '@redux/model';

export const MainPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { content } = useSelector((state: RootState) => state.mainPage);
    const [selectedCategory, setSelectedCategory] = useState<string>(CONSTANTS.ALL_CATEGORY);

    useEffect(() => {
        dispatch(fetchMainPageContent());
    }, [dispatch]);

    const uniqueTags = useUniqueTags(content);

    const filteredItems = content.filter(item =>
        selectedCategory === CONSTANTS.ALL_CATEGORY || item.tags.includes(selectedCategory)
    );

    return (
        <div className={styles.container}>
            <div className={styles.container__sidebar}>
                <button
                    key={CONSTANTS.ALL_CATEGORY}
                    onClick={() => setSelectedCategory(CONSTANTS.ALL_CATEGORY)}
                    className={selectedCategory === CONSTANTS.ALL_CATEGORY ? `${styles.text_selected} ${styles.selected}`
                        : `${styles.sidebar_frame} ${styles.text}`}
                >
                    {CONSTANTS.ALL_CATEGORY}
                </button>
                {uniqueTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedCategory(tag)}
                        className={selectedCategory === tag ? `${styles.text_selected} ${styles.selected}`
                            : `${styles.sidebar_frame} ${styles.text}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className={styles.container__content}>
                {filteredItems.map(({ image, name, bgColor }: MainContent, index) => (
                    <div
                        key={index}
                        className={styles.container__frame}
                        style={{
                            backgroundColor: `${bgColor}`
                        }}
                    >
                        <img
                            className={styles.frame_image}
                            src={image}
                            alt={name}
                        />
                        <div
                            className={styles.frame_description}
                        >
                            <span className={styles.text}>{name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};
