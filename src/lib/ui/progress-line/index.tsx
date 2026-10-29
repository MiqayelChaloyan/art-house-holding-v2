import React, { useEffect, useState } from 'react';

import colors from '@/src/themes';

import styles from './styles.module.sass';


interface PERCENTAGE {
    percentage: string;
    color: string;
};

const ProgressLine = ({
    backgroundColor = colors.lightWhite,
    visualParts = [
        {
            percentage: "0%",
            color: colors.white,
        }
    ]
}: any) => {
    const [widths, setWidths] = useState(
        visualParts.map(() => {
            return 0;
        })
    );

    useEffect(() => {
        requestAnimationFrame(() => {
            setWidths(
                visualParts.map((item: PERCENTAGE) => {
                    return item.percentage;
                })
            );
        });
    }, [visualParts]);

    return (
        <div className={styles.progress_visual_full} style={{ backgroundColor }}>
            {visualParts.map((item: PERCENTAGE, index: number) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: widths[index],
                            backgroundColor: item.color
                        }}
                        className={styles.progress_visual_part}
                    />
                );
            })}
        </div>
    );
};

export default ProgressLine;
