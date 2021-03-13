export const basicWidgetsLayout = [
    {
        title : 'Component',
        components : [
            {
                componenet : {
                    icon : 'grid-view',
                    name : 'Grid',
                    type : 'grid',
                    tag : ['div','grid']
                },
                layouts : {
                    lg : [
                        { w: 12, h: 50 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 10, h: 50 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 6, h: 50 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 4, h: 50 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 2, h: 50 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'header',
                    name : 'Header',
                    type : 'header',
                    tag : ['h1','header','h2']
                },
                layouts : {
                    lg : [
                        { w: 4, h: 5 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 4, h: 5 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24  }
                    ],
                    sm : [
                        { w: 4, h: 5 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24  }
                    ],
                    xs : [
                        { w: 4, h: 5 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24  }
                    ],
                    xxs : [
                        { w: 4, h: 5 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'new-text-box',
                    name : 'Text',
                    type : 'text',
                    tag : ['text','paragraph']
                },
                layouts : {
                    lg : [
                        { w: 4, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 4, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 4, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 4, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 4, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'media',
                    name : 'Image',
                    type : 'image',
                    tag : ['iamge','photo']
                },
                layouts : {
                    lg : [
                        { w: 2, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 2, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 2, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 2, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 2, h: 8 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'video',
                    name : 'Video',
                    type : 'video',
                    tag : ['video','youtube']
                },
                layouts : {
                    lg : [
                        { w: 4, h: 16 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 4, h: 16 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 4, h: 16 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 4, h: 16 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 4, h: 16 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'widget-button',
                    name : 'Button',
                    type : 'button',
                    tag : ['button']
                },
                layouts : {
                    lg : [
                        { w: 2, h: 4 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 2, h: 4 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 2, h: 4 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 2, h: 4 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 2, h: 4 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'path-search',
                    name : 'Google Map',
                    type : 'googleMap',
                    tag : ['map','google']
                },
                layouts : {
                    lg : [
                        { w: 10, h: 40 , minH : 1 , minW : 1 , maxH : 200 , maxW : 24 }
                    ],
                    md : [
                        { w: 8, h: 32 , minH : 1 , minW : 1 , maxH : 200 , maxW : 20  }
                    ],
                    sm : [
                        { w: 6, h: 24 , minH : 1 , minW : 1 , maxH : 200 , maxW : 12  }
                    ],
                    xs : [
                        { w: 4, h: 20 , minH : 1 , minW : 1 , maxH : 200 , maxW : 8  }
                    ],
                    xxs : [
                        { w: 2, h: 18 , minH : 1 , minW : 1 , maxH : 200 , maxW : 4  }
                    ]
                }
            }
        ]
    },
    {
        title : 'Widgets',
        components : [
            {
                componenet : {
                    icon : 'time',
                    name : 'Clock',
                    type : 'dateTimeWidget',
                    displayTimeZone: 'String',
                    clockType: 'digital',
                    countryCode: 'String',
                    tag : ['clock','time','date']
                },
                layouts : {
                    lg : [
                        {  w: 2, h: 10 , minH : 8 , minW : 2 , maxH : 20 , maxW : 12 }
                    ],
                    md : [
                        { w: 2, h: 10 , minH : 8 , minW : 2 , maxH : 20 , maxW : 12  }
                    ],
                    sm : [
                        { w: 2, h: 10 , minH : 8 , minW : 2 , maxH : 20 , maxW : 12  }
                    ],
                    xs : [
                        { w: 2, h: 10 , minH : 8 , minW : 2 , maxH : 20 , maxW : 12  }
                    ],
                    xxs : [
                        { w: 2, h: 10 , minH : 8 , minW : 2 , maxH : 20 , maxW : 12  }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'timeline-events',
                    name : 'Job Schedule',
                    type : 'cronJob',
                    tag : ['auth','cronjob']
                },
                layouts : {
                    lg : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    md : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    sm : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xs : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xxs : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ]
                }
            }
        ]
    },
    {
        title : 'Social Media',
        components : [
            {
                componenet : {
                    icon : 'th',
                    name : 'Trend Table',
                    source : 'twitter',
                    type : 'twitterTrendTable',
                    countryCode: 'String',
                    tag : ['trend','twitter']
                },
                layouts : {
                    lg : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    md : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    sm : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xs : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xxs : [
                        {  w: 6, h: 16 , minH : 10 , minW : 6 , maxH : 30 , maxW : 12 }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'timeline-line-chart',
                    name : 'Trend Chart',
                    source : 'twitter',
                    type : 'twitterTrendChart',
                    countryCode: 'String',
                    tag : ['trend','twitter']
                },
                layouts : {
                    lg : [
                        {  w: 6, h: 16 , minH : 15 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    md : [
                        {  w: 6, h: 16 , minH : 15 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    sm : [
                        {  w: 6, h: 16 , minH : 15 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xs : [
                        {  w: 6, h: 16 , minH : 15 , minW : 6 , maxH : 30 , maxW : 12 }
                    ],
                    xxs : [
                        {  w: 6, h: 16 , minH : 15 , minW : 6 , maxH : 30 , maxW : 12 }
                    ]
                }
            },
            {
                componenet : {
                    icon : 'key',
                    name : 'OAuth',
                    source : 'twitter',
                    type : 'twitterOAuth',
                    tag : ['auth','twitter']
                },
                layouts : {
                    lg : [
                        {  w: 2, h:  8, minH : 6 , minW : 2 , maxH : 10 , maxW : 12 }
                    ],
                    md : [
                        {  w: 2, h:  8, minH : 6 , minW : 2 , maxH : 10 , maxW : 12 }
                    ],
                    sm : [
                        {  w: 2, h:  8, minH : 6 , minW : 2 , maxH : 10 , maxW : 12 }
                    ],
                    xs : [
                        {  w: 2, h:  8, minH : 6 , minW : 2 , maxH : 10 , maxW : 12 }
                    ],
                    xxs : [
                        {  w: 2, h:  8, minH : 6 , minW : 2 , maxH : 10 , maxW : 12 }
                    ]
                }
            }
        ]
    }
]