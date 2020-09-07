/// <reference types="jest" />
import * as React from 'react';
import { render } from 'enzyme';
import Button from '../Button';

it('show Button', () => {
    const title = 'test';
    const result = render(<Button title={title} />);

    expect(result).toMatchSnapshot();
});
