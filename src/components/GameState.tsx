import React, { useEffect, useState, useCallback } from 'react';
import Room from '../definitions/Room';
import InventoryItem from '../definitions/InventoryItem';
import useLoadFromApi from '../hooks/useLoadFromApi';
import roomApi from '../api/room';
import characterApi from '../api/character';
import doodadApi from '../api/doodad';
import sleep from '../lib/sleep';

type Props = {
    children: (
        room: Room | null,
        inventory: InventoryItem[] | null,
        exitDescriptions: { [key: string]: string },
        actions: { 
            onMove: (direction: string) => void,
            onInspect: (slug: string) => void,
            onGet: (slug: string) => void,
            onUseSelf: (slug: string) => void,
            onUseOther: (slug: string, otherSlug: string) => void,
            onDeathWarp: () => void,
            onClearResponse: () => void,
        },
        response: string | undefined,
    ) => JSX.Element,
};

type DescriptionMap = {[description: string]: string};

const GameState: React.FunctionComponent<Props> = (props) => {
    const [response, setResponse] = useState<string>();
    const [exitDescriptions, setExitDescriptions] = useState<DescriptionMap>({});

    const [getRoom, room] = useLoadFromApi(roomApi.lookRoom);
    const [getInventory, inventory] = useLoadFromApi(characterApi.inventory);
    
    const inspect = async(slug: string) => {
        const description = await doodadApi.inspect(slug);
        setResponse(description);
    };

    const get = async(slug: string) => {
        const responseFromGet = await doodadApi.get(slug);
        setResponse(responseFromGet);
        getRoom();
        getInventory();
    };

    const move = async(direction: string) => {
        const responseFromMove = await roomApi.move(direction);
        setResponse(responseFromMove);
        getRoom();
    };

    const useOnSelf = async(slug: string) => {
        const responseFromUse = await doodadApi.useOnSelf(slug);
        setResponse(responseFromUse);
        getInventory();
    };

    const useOnOther = async(slug: string, otherSlug: string) => {
        const responseFromUse = await doodadApi.useOnOther(slug, otherSlug);
        setResponse(responseFromUse);
        getInventory();
        getRoom();
    };

    const deathwarp = async() => {
        const responseFromDeathwarp = await characterApi.origin();
        setResponse(responseFromDeathwarp);
        getInventory();
        getRoom();
    };

    const updateExits = useCallback(
        async () => {
            if (room != null) {
                const tempDescriptions: DescriptionMap = {};

                for (let i = 0; i < room.exits.length; i++) {
                    const exit = room.exits[i];
                    await sleep(2000);
                    const description = await roomApi.lookDirection(exit);
                    tempDescriptions[exit] = description;
                }

                setExitDescriptions({...tempDescriptions});
            }
        },
        [room],
    );

    const actions = {
        onMove: move,
        onInspect: inspect,
        onGet: get,
        onUseSelf: useOnSelf,
        onUseOther: useOnOther,
        onDeathWarp: deathwarp,
        onClearResponse: () => { setResponse(undefined); },
    };

    useEffect(
        () => {
            getRoom();
        },
        [getRoom]
    );

    useEffect(
        () => {
            getInventory();
        },
        [getInventory],
    );

    useEffect(
        () => { updateExits(); },
        [updateExits]
    );

    return props.children(room, inventory, exitDescriptions, actions, response);
};

export default GameState;
