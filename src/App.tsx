/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core'
import { COLORS } from './styling/variables';
import Screen from './components/Screen';
import GetKeyModal from './components/GetKeyModal';

import { getApiKey, setApiKey } from './api/utils/api-key';

const AppStyle = css({
    backgroundColor: COLORS.DARK,
    color: COLORS.PRIMARY,
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

function App() {
    const [key, setKey] = useState<string | null>(getApiKey());

    const onKeySubmit = (key: string) => {
        setKey(key);
        setApiKey(key);
    };

    return (
        <div css={AppStyle}>
            {key == null
                ? <GetKeyModal onKeySubmit={onKeySubmit} />
                : <Screen />
            }
        </div>
    );
}

export default App;
