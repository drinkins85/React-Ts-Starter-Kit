import * as React from 'react';
import Button from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        color: { control: 'color' },
        size: {
            control: {
                type: 'range',
                min: 6,
                max: 50,
            },
        },
    },
};

export const Base = (args) => <Button {...args} />;
Base.args = {
    title: 'test',
};
