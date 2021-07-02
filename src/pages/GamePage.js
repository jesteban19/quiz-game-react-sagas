import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { answerQuestion } from '../store/slices/game';
import { finishGame } from '../store/slices/gameInit';
import Button from '../components/Button';

const GamePage = () => {
    const dispatch = useDispatch();
    const [timeLeft,setTimeLeft] = useState(60);

    const currentQuestion = useSelector( 
        state => state.quiz.questions[state.quiz.currentQuestionIndex].question
    );
    const score = useSelector(state => state.quiz.score);
    const currentQuestionIndex = useSelector(state => state.quiz.currentQuestionIndex);

    const answerHandler = (answer) => {
        dispatch(answerQuestion({answer}));
    }

    const endGameHandler = e => {
        dispatch(finishGame());
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    },[])
    return (
        <>
            <div className="flex flex-col items-center relative">
                <p className="h-20 w-20 flex justify-center items-center border-8 border-purple-500 rounded-full my-4 text-purple-500 text-3xl">{timeLeft}</p>
                <p className="absolute top-4 left-4 text-2xl text-purple-500">{score}</p>
                <p className="absolute top-4 right-4 text-2xl text-purple-500">{currentQuestionIndex} / 10</p>
                <p className="p-7 bg-white rounded shadow" dangerouslySetInnerHTML={{ __html: currentQuestion}}></p>
                <div className="flex justify-between w-96 mt-8">
                    <Button onClick={() => answerHandler('True')}>True</Button>
                    <Button onClick={() => answerHandler('False')}>False</Button>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <Button type="error" onClick={endGameHandler}>Quit Game</Button>
            </div>
        </>
    )
}

export default GamePage
