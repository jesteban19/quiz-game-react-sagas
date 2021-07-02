import { fork, take, put, call, delay, cancel } from "@redux-saga/core/effects";
import { startGame, cancelGame } from "../slices/gameInit";
import {fetchQuizFromApi} from '../../utils/api';
import { fetchQuestionsSuccess, fetchQuestionsFail } from '../slices/game';

function* fetchQuestionSaga(){
    try{
        yield delay(1000);
        const data = yield call(fetchQuizFromApi);
        yield put(fetchQuestionsSuccess(data))
    }catch(error){
        yield put(fetchQuestionsFail('There was an error fetching the questions.'))
    }
}

function* cancelFetchQuiz(forkedSaga){
    while(true){
        yield take(cancelGame.type);
        yield cancel(forkedSaga);
    }
}

export default function* startGameSaga(){
    while(true){
        yield take(startGame.type);
        const forkedSaga = yield fork(fetchQuestionSaga);
        yield fork(cancelFetchQuiz, forkedSaga);
    }
}