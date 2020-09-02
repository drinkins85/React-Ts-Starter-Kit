import * as React from 'react';

type TitleProps = {
    title: string;
    color?: string;
    size?: number;
};

function Button({ title, color, size }: TitleProps): JSX.Element {
    const onTitleClick = () => {
        console.log('test');
    };

    const styles:React.CSSProperties = {
        color,
        fontSize: size,
    };

    return (
        <button
            type="button"
            className="Title"
            onClick={onTitleClick}
            style={styles}
        >
            {title}
        </button>
    );
}

export default Button;
