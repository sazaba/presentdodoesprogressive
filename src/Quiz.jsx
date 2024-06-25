
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                "id": 1,
                "question": "___ she like ice cream?",
                "options": ["Do", "Does", "Is", "Are"],
                "answer": ["Does"],
                "selectedOption": null
            }
            ,
            {
                "id": 2,
                "question": "___ they usually go to the gym?",
                "options": ["Do", "Does", "Is", "Are"],
                "answer": ["Do"],
                "selectedOption": null
            }
            ,
            {
                "id": 3,
                "question": "They ___ basketball right now.",
                "options": ["play", "plays", "are playing", "is playing"],
                "answer": ["are playing"],
                "selectedOption": null
            }
            ,
            {
                "id": 4,
                "question": "What time ___ your English class start?",
                "options": ["Do", "Does", "Is", "Are"],
                "answer": ["does"],
                "selectedOption": null
            }
            ,
            {
                "id": 5,
                "question": "___ she always arrive late?",
                "options": ["Do", "Does", "Is", "Are"],
                "answer": ["Does"],
                "selectedOption": null
            }

        ]
        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "He ___ (like) to play basketball on weekends.",
                "options": [],
                "answer": ["likes", "Likes", "LIKES"],
                "selectedOption": null
            }
            ,
            {
                "id": 7,
                "question": "She ___ (not have) any pets.",
                "options": [],
                "answer": ["does not have", "doesn't have", "Does not have", "Doesn't have", "DOES NOT HAVE", "DOESN'T HAVE"],
                "selectedOption": null
            }
            ,
            {
                "id": 8,
                "question": "They ___ (play) soccer at the moment.",
                "options": [],
                "answer": ["are playing", "Are playing", "ARE PLAYING"],
                "selectedOption": null
            }
            ,
            {
                "id": 9,
                "question": "John ___ (not live) in London.",
                "options": [],
                "answer": ["does not live", "doesn't live", "Does not live", "Doesn't live", "DOES NOT LIVE", "DOESN'T LIVE"],
                "selectedOption": null
            }
            ,
            {
                "id": 10,
                "question": "What time ___ the movie start?",
                "options": [],
                "answer": ["does", "Does", "DOES"],
                "selectedOption": null
            }

        ]
        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "He don't like to eat vegetables.",
                "options": ["don't", "doesn't", "like", "likes"],
                "answer": ["don't"],
                "selectedOption": null
            }

            ,
            {
                "id": 12,
                "question": "John don't have a car.",
                "options": ["don't", "doesn't", "have", "has"],
                "answer": ["don't"],
                "selectedOption": null
            }

            ,
            {
                "id": 13,
                "question": "She are studying for her exam.",
                "options": ["She", "are", "studying", "for"],
                "answer": ["are"],
                "selectedOption": null
            }

            ,
            {
                "id": 14,
                "question": "They goes to the gym every morning.",
                "options": ["They", "goes", "to", "the"],
                "answer": ["goes"],
                "selectedOption": null
            }

            ,
            {
                "id": 15,
                "question": "She doesn't like to plays tennis.",
                "options": ["doesn't", "like", "to", "plays"],
                "answer": ["plays"],
                "selectedOption": null
            }

        ]
        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "She ___ (study) English every day.",
                "options": [],
                "answer": ["studies", "Studies", "STUDIES"],
                "selectedOption": null
            }
            ,
            {
                "id": 17,
                "question": "He ___ (not like) coffee.",
                "options": [],
                "answer": ["does not like", "doesn't like", "Does not like", "Doesn't like", "DOES NOT LIKE", "DOESN'T LIKE"],
                "selectedOption": null
            }
            ,
            {
                "id": 18,
                "question": "They ___ (play) basketball right now.",
                "options": [],
                "answer": ["are playing", "Are playing", "ARE PLAYING"],
                "selectedOption": null
            }
            ,
            {
                "id": 19,
                "question": "She ___ (go) to the gym every morning.",
                "options": [],
                "answer": ["goes", "Goes", "GOES"],
                "selectedOption": null
            }
            ,
            {
                "id": 20,
                "question": "___ they speak Spanish?",
                "options": [],
                "answer": ["Do", "do", "DO"],
                "selectedOption": null
            }

        ]
        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "What does Mary enjoy doing every weekend?",
                "options": ["Visiting the beach", "Going shopping", "Visiting the local zoo", "Playing video games"],
                "answer": ["Visiting the local zoo"],
                "selectedOption": null
            }
            ,
            {
                "id": 22,
                "question": "What is Mary's favorite animal?",
                "options": ["Lion", "Monkey", "Giraffe", "Bird"],
                "answer": ["Giraffe"],
                "selectedOption": null
            }
            ,
            {
                "id": 23,
                "question": "What does Mary want to become in the future?",
                "options": ["Teacher", "Doctor", "Veterinarian", "Engineer"],
                "answer": ["Veterinarian"],
                "selectedOption": null
            }
            ,
            {
                "id": 24,
                "question": "Which animal did they see last Sunday?",
                "options": ["Giraffe", "Monkey", "Lion", "Bird"],
                "answer": ["Lion"],
                "selectedOption": null
            }
            ,
            {
                "id": 25,
                "question": "What does Mary like about giraffes?",
                "options": ["Their long necks and kind eyes", "Their colorful feathers", "Their playful nature", "Their fierce roar"],
                "answer": ["Their long necks and kind eyes"],
                "selectedOption": null
            }

        ]
        ,

        // audioComprehension: [
        //     {
        //         id: 100,
        //         question: " What is Julie's favorite color?",
        //         options: ["Blue", "Green"],
        //         answer: "Blue",
        //         selectedOption: null,
        //         audio: julie
        //     },
        // ],
    });



    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
                                    value={question.selectedOption || ''}
                                    onChange={(e) => handleInputChange(category, question.id, e)}
                                    disabled={submitted}
                                />
                            ) : (
                                question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                        onClick={() => handleAnswer(category, question.id, option)}
                                        disabled={submitted}
                                        style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                    >
                                        {option}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 '>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>Mary loves animals. Every weekend, she visits the local zoo with her family. They enjoy watching the playful monkeys and the colorful birds. Mary's favorite animal is the gentle giraffe because of its long neck and kind eyes. Last Sunday, they also saw a fierce lion roaring in its enclosure. Mary dreams of becoming a veterinarian one day to help care for all kinds of animals.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
