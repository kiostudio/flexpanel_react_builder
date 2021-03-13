export const actionsMenu = {
    grid : {
        icon : 'grid-view',
    },
    text : {
        icon : 'new-text-box',
    },
    header : {
        icon : 'header',
    },
    image : {
        icon : 'media',
        actions : {
            onMouseDown : {
                displayName : 'On Click',
                customFunction : false,
                functionName : {
                    link : {
                        collapse : true,
                        source : {
                            displayName : 'Url',
                            defaultValue : null,
                            input : 'urlPicker',
                            inputParams : {
                                tabsAndPanelUrl : true
                            }
                        },
                        newWindow : {
                            displayName : 'New Window',
                            defaultValue : false,
                            input : 'toogle',
                            helperText : {
                                value : 'Open a new window along with the URL'
                            }
                        }
                    }
                }
            }
        }
    },
    video : {
        icon : 'video',
    },
    button : {
        icon : 'widget-button',
        actions : {
            onMouseDown : {
                displayName : 'On Click',
                customFunction : false,
                functionName : {
                    link : {
                        collapse : true,
                        source : {
                            displayName : 'Url',
                            defaultValue : null,
                            input : 'urlPicker',
                            inputParams : {
                                tabsAndPanelUrl : true
                            }
                        },
                        newWindow : {
                            displayName : 'New Window',
                            defaultValue : false,
                            input : 'toogle',
                            helperText : {
                                value : 'Open a new window along with the URL'
                            }
                        }
                    },
                    // Modal Pop Up
                    // HTTP Request
                    // Scroll To
                    // Alert
                }
            },
            // onMouseLeave : {
            //     displayName : 'On Click Release'
            // }
        }
    }
}