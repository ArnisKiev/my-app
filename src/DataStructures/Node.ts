
export interface IStudent {
    grades: number;
    hasRecommendationLetter: boolean;
    hasVolunteerExperience: boolean;
    extraCurriculars: boolean;  // Змінено на булевий тип
    financialAidNeeded: boolean;
    attendedPrepCourse: boolean;
    hasLeadershipExperience: boolean;
}

export interface INode {
    id: string;
    question?: string;
    definitionFunction: (student: IStudent) => boolean;
    trueNode?: INode;
    falseNode?: INode;
    isList: boolean;
}

export const decisionTree: INode = {
    id: '1',
    question: "Чи середній бал абітурієнта вище 75?",
    definitionFunction: (student: IStudent) => student.grades > 75,
    isList: false,
   
        trueNode: {
            id: '2',
            question: "Чи відвідував абітурієнт підготовчі курси?",
            definitionFunction: (student: IStudent) => student.attendedPrepCourse,
            isList: false,
            trueNode: {
                id: '3',
                question: "Чи має абітурієнт рекомендаційний лист?",
                definitionFunction: (student: IStudent) => student.hasRecommendationLetter,
                isList: false,
                trueNode: {
                    question: "Чи має абітурієнт волонтерський досвід?",
                    id: '4',
                    definitionFunction: (student: IStudent) => student.hasVolunteerExperience,
                    isList: false,
                    trueNode: {
                        question: "Чи має абітурієнт досвід керівництва?",
                        id: '5',
                        definitionFunction: (student: IStudent) => student.hasLeadershipExperience,
                        isList: false,
                        trueNode: {
                            question: "Чи займається абітурієнт позакласними заходами?",
                            id: '6',
                            definitionFunction: (student: IStudent) => student.extraCurriculars,
                            isList: false,
                            trueNode: {
                                question: "Вступ можливий",
                                id: '7',
                                definitionFunction: (student: IStudent) => true,
                                isList: true
                            },
                            falseNode: {
                                question: "Вступ не можливий",
                                id: '8',
                                definitionFunction: () => false,
                                isList: true
                            }
                        },
                        falseNode: {
                            question: "Вступ не можливий",
                            id: '9',
                            definitionFunction: () => false,
                            isList: true
                        }
                    },
                    falseNode: {
                        question: "Вступ не можливий",
                        id: '10',
                        definitionFunction: () => false,
                        isList: true
                    }
                },
                falseNode: {
                    question: "Вступ не можливий",
                    id: '11',
                    definitionFunction: () => false,
                    isList: true
                }
            },
            falseNode: {
                question: "Чи має абітурієнт хоча б один позакласний захід?",
                id: '12',
                definitionFunction: (student: IStudent) => student.extraCurriculars,
                isList: false,
                trueNode: {
                    question: "Чи має абітурієнт волонтерський досвід?",
                    id: '13',
                    definitionFunction: (student: IStudent) => student.hasVolunteerExperience,
                    isList: false,
                    trueNode: {
                        question: "Чи займається абітурієнт спортом?",
                        id: '14',
                        definitionFunction: (student: IStudent) => student.extraCurriculars,
                        isList: false,
                        trueNode: {
                            question: "Вступ можливий",
                            id: '15',
                            definitionFunction: (student: IStudent) => true,
                            isList: true,
                        },
                        falseNode: {
                            question: "Вступ не можливий",
                            id: '16',
                            definitionFunction: () => false,
                            isList: true
                        }
                    },
                    falseNode: {
                        question: "Вступ не можливий",
                        id: '17',
                        definitionFunction: () => false,
                        isList: true
                    }
                },
                falseNode: {
                    question: "Вступ не можливий",
                    id: '18',
                    definitionFunction: () => false,
                    isList: true
                }
            }
        },
    
    falseNode: {
        question: "Чи абітурієнт має рекомендаційний лист?",
        id: '19',
        definitionFunction: (student: IStudent) => student.hasRecommendationLetter,
        isList: false,
        trueNode: {
            question: "Чи абітурієнт має досвід волонтерської діяльності?",
            id: '20',
            definitionFunction: (student: IStudent) => student.hasVolunteerExperience,
            isList: false,
            trueNode: {
                question: "Чи абітурієнт має досвід керівництва?",
                id: '21',
                definitionFunction: (student: IStudent) => student.hasLeadershipExperience,
                isList: false,
                trueNode: {
                    question: "Чи абітурієнт займається позакласними заходами?",
                    id: '22',
                    definitionFunction: (student: IStudent) => student.extraCurriculars,
                    isList: false,
                    trueNode: {
                        question: "Вступ можливий",
                        id: '23',
                        definitionFunction: (student: IStudent) => true,
                        isList: true
                    },
                    falseNode: {
                        question: "Вступ не можливий",
                        id: '24',
                        definitionFunction: () => false,
                        isList: true
                    }
                },
                falseNode: {
                    question: "Вступ не можливий",
                    id: '25',
                    definitionFunction: () => false,
                    isList: true
                }
            },
            falseNode: {
                question: "Вступ не можливий",
                id: '26',
                definitionFunction: () => false,
                isList: true
            }
        },
        falseNode: {
            question: "Чи абітурієнт потребує фінансової допомоги?",
            id: '27',
            definitionFunction: (student: IStudent) => student.financialAidNeeded,
            isList: false,
            trueNode: {
                question: "Вступ можливий",
                id: '28',
                definitionFunction: () => true,
                isList: true
            },
            falseNode: {
                question: "Вступ не можливий",
                id: '29',
                definitionFunction: () => false,
                isList: true
            }
        }
    }
};