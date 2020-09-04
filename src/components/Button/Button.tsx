import * as React from 'react';
import './Button.scss'
import TimePic from './assets/time.png';

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
            className="Button"
            onClick={onTitleClick}
            style={styles}
        >
            {title}
            <img src={TimePic} className="Title-Image" alt="" />
        </button>
    );
}

export default Button;
