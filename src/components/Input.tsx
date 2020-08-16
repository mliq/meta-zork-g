/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BORDERS, COLORS, FONTS, SHADOWS } from '../styling/variables';

type Props = React.HTMLProps<HTMLInputElement>;

const inputStyle = css({
    ...BORDERS.PRIMARY,
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    padding: '8px',
    fontFamily: FONTS.PRIMARY,
    fontSize: '16px',
    boxShadow: `${SHADOWS.PRIMARY_GLOW}, inset ${SHADOWS.PRIMARY_GLOW}`,
    textShadow: SHADOWS.PRIMARY_GLOW,
});

const Input: React.FunctionComponent<Props> = (props) => {
    return <input {...props} css ={inputStyle} />
};

export default Input;
