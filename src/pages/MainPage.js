import React from 'react'
import { useSelector } from 'react-redux'
import StartGame from './StartGamePage'
import Game from './GamePage'
import Fetching from './FetchingPage' 
import EndGame from './EndGamePage'
import * as stages from '../utils/constants';

const MainPage = () => {
    const currentStage = useSelector(state => state.gameState.stage)
    let displayedPage;

    switch (currentStage) {
        case stages.START_GAME:
            displayedPage = <StartGame />;
            break;
        case stages.FETCHING_GAME:
            displayedPage = <Fetching />;
            break;
        case stages.GAME:
            displayedPage = <Game />;
            break;
        case stages.END_GAME:
            displayedPage = <EndGame />;
            break;
        default:
            break;
    }
    return (
        <div className="font-mono bg-purple-50 min-h-screen">
            <h1 className="bg-purple-500 text-white p-4 text-2xl text-center uppercase">Redux Saga Quiz Game</h1>
            {displayedPage}
        </div>
    )
}

export default MainPage
