/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SIZES } from '../styling/variables';
import Button from './Button';
import List from './List';

type Props = {
    exits: string[],
    exitDescriptions: { [key: string] : string },
    onMove: (direction: string) => void,
};

const directionStyle = css({
    '::before': {
        content: '"* "',
    },
    gridArea: 'direction',
});

const buttonStyle = css({ gridArea: 'button' });
const descriptionStyle = css({ gridArea: 'description' });

const itemStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
        "direction button"
        "description description"
    `,
    width: '100%',
    gridColumnGap: SIZES.HALF,
    paddingBottom: SIZES.STANDARD,
    alignItems: 'center',
});

const ExitList: React.FunctionComponent<Props> = ({ exits, exitDescriptions, onMove }) => (
    <List>
        {exits.map(exit =>
            <li key={exit}>
                <div css={itemStyle}>
                    <div css={directionStyle}>{exit}</div>
                    <div css={buttonStyle}>
                        <Button type="button" onClick={() => onMove(exit)}>Go</Button>
                    </div>
                    <div css={descriptionStyle}>{exitDescriptions[exit]}</div>
                </div>
            </li>
        )}
    </List>
);

export default ExitList;