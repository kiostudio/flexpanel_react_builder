export const propsMenu = {
    grid : {
        icon : 'grid-view',
        // 1. ** Store as a AWSJSON Object in Componenet Schema (Pro : Easy to Configure ; Cons : Without Schema Checking)
        // 2. Store as a seperate Schema - Props
        state : ['default'],
        customState : false,
        props : {
            default : {
                helperText : {
                    value : 'The default style when the component is render.'
                },
                background : {
                    collapse : true,
                    helperText : 'Configure the backgorund of the selected grid.',
                    backgroundColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    },
                    backgroundImage : {
                        displayName : 'Background Image',
                        defaultValue : null,
                        input : 'imagePicker'
                        // 3 Ways to Set an Image Background : 1. Url , 2. Upload , 3. Unsplash / Library
                    },
                    backgroundVideo : {
                        displayName : 'Background Video',
                        defaultValue : null,
                        input : 'videoPicker',
                        helperText : 'Background video cannot be preview in editing mode'
                        // 2 Main Ways to Set an Video Background : 1. Url , 2. YouTube , 3. Upload (Later), 4. Library (Later)
                    },
                    backgroundPattern : {
                        displayName : 'Background Pattern',
                        defaultValue : null,
                        input : 'patternPicker'
                    },   
                    backgroungImgOpacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    }    
                },
                overlay : {
                    collapse : true,
                    overlayColor : {
                        displayName : 'Overlay Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    overlayGradient : {
                        displayName : 'Overlay Gradient',
                        defaultValue : null,
                        input : 'gradientPicker'
                    },
                    backgroundImageBlur : {
                        displayName : 'Background Blur',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,10],
                            min: 0,
                            max: 10
                        }
                    }
                },
                border : {
                    collapse : true,
                    borderColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    borderWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    borderType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                radius : {
                    collapse : false,
                    borderTopLeftRadius : {
                        displayName  : 'Top Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderTopRightRadius : {
                        displayName  : 'Top Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomLeftRadius : {
                        displayName  : 'Bottom Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomRightRadius : {
                        displayName  : 'Bottom Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    }
                },
                boxShadow : {
                    collapse : false,
                    shadowColor : {
                        displayName : 'Shadow Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 0
                        },
                        input : 'colorPicker'
                    },
                    shadowOffsetX : {
                        displayName  : 'Shadow Offset-X',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowOffsetY : {
                        displayName  : 'Shadow Offset-Y',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowBlur : {
                        displayName  : 'Shadow Blur Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowSpread : {
                        displayName  : 'Shadow Spread Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                outline : {
                    collapse : false,
                    outlineColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    outlineWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    outlineType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                margin : {
                    collapse : false,
                    marginTop : {
                        displayName  : 'Margin Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginBottom : {
                        displayName  : 'Margin Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginLeft : {
                        displayName  : 'Margin Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginRight : {
                        displayName  : 'Margin Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                }
            }
        }
    },
    text : {
        icon : 'new-text-box',
        state : ['default'],
        props : {
            default : {
                content : {
                    collapse : true,
                    textContent : {
                        displayName : 'Text',
                        defaultValue : null,
                        input : 'textArea',
                    }
                },
                typography : {
                    collapse : true,
                    fontColor : {
                        displayName : 'Font Color',
                        defaultValue : {
                            r : 0,
                            g : 0,
                            b : 0,
                            a : 1
                        },
                        input : 'colorPicker',
                    },
                    fontFamily : {
                        displayName : 'Font Family',
                        defaultValue : 'Arial',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'Arial'
                                },
                                {
                                    value : 'Times New Roman'
                                },
                                {
                                    value : 'Georgia'
                                },
                                {
                                    value : 'Palatino Linotype'
                                },
                                {
                                    value : 'Book Antiqua'
                                },
                                {
                                    value : 'Helvetica'
                                },
                                {
                                    value : 'Arial Black'
                                },
                                {
                                    value : 'Impact'
                                },
                                {
                                    value : 'Lucida Sans Unicode'
                                },
                                {
                                    value : 'Tahoma'
                                },
                                {
                                    value : 'Verdana'
                                },
                                {
                                    value : 'Courier New'
                                },
                                {
                                    value : 'Lucida Console'
                                },
                                {
                                    value : 'initial'
                                }
                            ]
                        }
                    },
                    fontSize : {
                        displayName  : 'Font Size',
                        defaultValue : 14,
                        input : 'number',
                        inputParams : {
                            min: 1,
                            max: 1000
                        }
                    },
                    fontWeight : {
                        displayName : 'Font Weight',
                        defaultValue : 100,
                        input : 'range',
                        inputParams : {
                            labelValues : [100,900],
                            min: 100,
                            max: 900,
                            stepSize : 100
                        }
                    },
                    horizontalAlignment : {
                        displayName : 'Horizontal Alignment',
                        defaultValue : 'left',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'left',
                                    icon : 'align-left',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'align-center',
                                    toogle : false
                                },
                                {
                                    value : 'right',
                                    icon : 'align-right',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    verticalAlignment : {
                        displayName : 'Vertical Alignment',
                        defaultValue : 'center',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'flex-start',
                                    icon : 'alignment-top',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'vertical-distribution',
                                    toogle : false
                                },
                                {
                                    value : 'flex-end',
                                    icon : 'alignment-bottom',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    fontStyle : {
                        displayName : 'Font Style',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'italic',
                                    icon : 'italic',
                                    toogle : true
                                }
                            ]
                        }
                    },
                    textDecoration: {
                        displayName : 'Text Decoration',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'line-through',
                                    icon : 'strikethrough',
                                    toogle : true
                                },
                                {
                                    value : 'underline',
                                    icon : 'underline',
                                    toogle : true
                                }
                            ]
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                background : {
                    collapse : false,
                    helperText : 'Configure the backgorund of the selected grid.',
                    backgroundColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    }    
                },
                textShadow : {
                    collapse : false,
                    shadowColor : {
                        displayName : 'Shadow Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 0
                        },
                        input : 'colorPicker'
                    },
                    shadowOffsetX : {
                        displayName  : 'Shadow Offset-X',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowOffsetY : {
                        displayName  : 'Shadow Offset-Y',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowBlur : {
                        displayName  : 'Shadow Blur Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                },
                margin : {
                    collapse : false,
                    marginTop : {
                        displayName  : 'Margin Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginBottom : {
                        displayName  : 'Margin Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginLeft : {
                        displayName  : 'Margin Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginRight : {
                        displayName  : 'Margin Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                }
            }
        }
    },
    header : {
        icon : 'header',
        state : ['default'],
        props : {
            default : {
                content : {
                    collapse : true,
                    textContent : {
                        displayName : 'Text',
                        defaultValue : null,
                        input : 'text',
                    },
                    headerType : {
                        displayName : 'Header Type',
                        defaultValue : 'h1',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'h1'
                                },
                                {
                                    value : 'h2'
                                },
                                {
                                    value : 'h3'
                                },
                                {
                                    value : 'h4'
                                },
                                {
                                    value : 'h5'
                                }
                            ]
                        }
                    }
                },
                typography : {
                    collapse : true,
                    fontColor : {
                        displayName : 'Font Color',
                        defaultValue : {
                            r : 0,
                            g : 0,
                            b : 0,
                            a : 1
                        },
                        input : 'colorPicker',
                    },
                    fontFamily : {
                        displayName : 'Font Family',
                        defaultValue : 'Arial',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'Arial'
                                },
                                {
                                    value : 'Times New Roman'
                                },
                                {
                                    value : 'Georgia'
                                },
                                {
                                    value : 'Palatino Linotype'
                                },
                                {
                                    value : 'Book Antiqua'
                                },
                                {
                                    value : 'Helvetica'
                                },
                                {
                                    value : 'Arial Black'
                                },
                                {
                                    value : 'Impact'
                                },
                                {
                                    value : 'Lucida Sans Unicode'
                                },
                                {
                                    value : 'Tahoma'
                                },
                                {
                                    value : 'Verdana'
                                },
                                {
                                    value : 'Courier New'
                                },
                                {
                                    value : 'Lucida Console'
                                },
                                {
                                    value : 'initial'
                                }
                            ]
                        }
                    },
                    fontSize : {
                        displayName  : 'Font Size',
                        defaultValue : 40,
                        input : 'number',
                        inputParams : {
                            min: 1,
                            max: 1000
                        }
                    },
                    fontWeight : {
                        displayName : 'Font Weight',
                        defaultValue : 100,
                        input : 'range',
                        inputParams : {
                            labelValues : [100,900],
                            min: 100,
                            max: 900,
                            stepSize : 100
                        }
                    },
                    horizontalAlignment : {
                        displayName : 'Horizontal Alignment',
                        defaultValue : 'center',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'flex-start',
                                    icon : 'align-left',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'align-center',
                                    toogle : false
                                },
                                {
                                    value : 'flex-end',
                                    icon : 'align-right',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    verticalAlignment : {
                        displayName : 'Vertical Alignment',
                        defaultValue : 'center',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'flex-start',
                                    icon : 'alignment-top',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'vertical-distribution',
                                    toogle : false
                                },
                                {
                                    value : 'flex-end',
                                    icon : 'alignment-bottom',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    fontStyle : {
                        displayName : 'Font Style',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'italic',
                                    icon : 'italic',
                                    toogle : true
                                }
                            ]
                        }
                    },
                    textDecoration: {
                        displayName : 'Text Decoration',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'line-through',
                                    icon : 'strikethrough',
                                    toogle : true
                                },
                                {
                                    value : 'underline',
                                    icon : 'underline',
                                    toogle : true
                                }
                            ]
                        }
                    }
                },
                background : {
                    collapse : false,
                    helperText : 'Configure the backgorund of the selected grid.',
                    backgroundColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    }    
                },
                textShadow : {
                    collapse : false,
                    shadowColor : {
                        displayName : 'Shadow Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 0
                        },
                        input : 'colorPicker'
                    },
                    shadowOffsetX : {
                        displayName  : 'Shadow Offset-X',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowOffsetY : {
                        displayName  : 'Shadow Offset-Y',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowBlur : {
                        displayName  : 'Shadow Blur Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                margin : {
                    collapse : false,
                    marginTop : {
                        displayName  : 'Margin Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginBottom : {
                        displayName  : 'Margin Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginLeft : {
                        displayName  : 'Margin Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginRight : {
                        displayName  : 'Margin Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                }
            }
        }
    },
    image : {
        icon : 'media',
        state : ['default','hover','initiation'],
        props : {
            default : {
                content : {
                    collapse : true,
                    // helperText : 'Configure the image content of the selected grid.',
                    image : {
                        displayName : 'Image',
                        defaultValue : null,
                        input : 'imagePicker'
                        // 3 Ways to Set an Image Background : 1. Url , 2. Upload , 3. Unsplash / Library
                    },
                    objectFit : {
                        displayName : 'Fit Mode',
                        defaultValue : 'contain',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'contain'
                                },
                                {
                                    value : 'fill'
                                },
                                {
                                    value : 'cover'
                                },
                                {
                                    value : 'none'
                                },
                                {
                                    value : 'scale-down'
                                }
                            ]
                        }
                    }
                },
                transition : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    }
                },
                filter : {
                    collapse : true,
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    },
                    greyScale : {
                        displayName : 'Grey Scale',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,100],
                            stepSize : 10,
                            min: 0,
                            max: 100
                        }
                    }
                },
                padding  : {
                    collapse : true,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                border : {
                    collapse : true,
                    borderColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    borderWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    borderType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                radius : {
                    collapse : false,
                    borderTopLeftRadius : {
                        displayName  : 'Top Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderTopRightRadius : {
                        displayName  : 'Top Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomLeftRadius : {
                        displayName  : 'Bottom Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomRightRadius : {
                        displayName  : 'Bottom Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    }
                },
                boxShadow : {
                    collapse : false,
                    shadowColor : {
                        displayName : 'Shadow Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 0
                        },
                        input : 'colorPicker'
                    },
                    shadowOffsetX : {
                        displayName  : 'Shadow Offset-X',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowOffsetY : {
                        displayName  : 'Shadow Offset-Y',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowBlur : {
                        displayName  : 'Shadow Blur Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowSpread : {
                        displayName  : 'Shadow Spread Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                },
                background : {
                    collapse : false,
                    helperText : 'Configure the backgorund of the selected grid.',
                    backgroundColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    }    
                },
                margin : {
                    collapse : false,
                    marginTop : {
                        displayName  : 'Margin Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginBottom : {
                        displayName  : 'Margin Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginLeft : {
                        displayName  : 'Margin Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginRight : {
                        displayName  : 'Margin Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                }
            },
            hover : {
                transition : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    }
                },
                filter : {
                    collapse : true,
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    }
                },
                padding  : {
                    collapse : true,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                rotate : {
                    collapse : false,
                    rotation : {
                        displayName  : 'Rotation',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 360
                        }
                    }
                },
                boxShadow : {
                    collapse : false,
                    shadowColor : {
                        displayName : 'Shadow Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 0
                        },
                        input : 'colorPicker'
                    },
                    shadowOffsetX : {
                        displayName  : 'Shadow Offset-X',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowOffsetY : {
                        displayName  : 'Shadow Offset-Y',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowBlur : {
                        displayName  : 'Shadow Blur Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    shadowSpread : {
                        displayName  : 'Shadow Spread Radius',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                },
            },
            initiation : {
                animation : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    },
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    },
                    direction : {
                        displayName : 'Initial Direction',
                        defaultValue : 'none',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    displayName : 'None',
                                    value : 'none'
                                },
                                {
                                    displayName : 'From Bottom',
                                    value : 'bottom'
                                },
                                // {
                                //     displayName : 'From Top',
                                //     value : 'top'
                                // },
                                // {
                                //     displayName : 'From Left',
                                //     value : 'left'
                                // },
                                {
                                    displayName : 'From Right',
                                    value : 'right'
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    video : {
        icon : 'video',
        state : ['default'],
        props : {
            default : {
                content : {
                    collapse : true,
                    video : {
                        displayName : 'Video Source',
                        defaultValue : null,
                        input : 'videoPicker',
                        helperText : 'Video may not be preview in editing mode'
                        // 2 Main Ways to Set an Video Background : 1. Url , 2. YouTube , 3. Upload (Later), 4. Library (Later)
                    }
                },
                setting : {
                    collapse : true,
                    loop : {
                        displayName : 'Loop',
                        defaultValue : false,
                        input : 'toogle',
                        helperText : 'Loop effect may not be preview in editing mode'
                    },
                    autoPlay : {
                        displayName : 'Auto Play',
                        defaultValue : false,
                        input : 'toogle',
                        helperText : 'Auto play effect may not be preview in editing mode'
                    },
                    mute : {
                        displayName : 'Mute',
                        defaultValue : true,
                        input : 'toogle'
                    },
                    control : {
                        displayName : 'Control',
                        defaultValue : false,
                        input : 'toogle'
                    }
                }
            }
        }
    },
    button : {
        icon : 'widget-button',
        state : ['default','hover','click','initiation'],
        props : {
            default : {
                helperText : {
                    value : 'The default style when the component is render.'
                },
                content : {
                    collapse : true,
                    textContent : {
                        displayName : 'Text',
                        defaultValue : 'Button',
                        input : 'text',
                    },
                },
                transition : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    }
                },
                typography : {
                    collapse : true,
                    fontColor : {
                        displayName : 'Font Color',
                        defaultValue : {
                            r : 0,
                            g : 0,
                            b : 0,
                            a : 1
                        },
                        input : 'colorPicker',
                    },
                    fontFamily : {
                        displayName : 'Font Family',
                        defaultValue : 'Arial',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'Arial'
                                },
                                {
                                    value : 'Times New Roman'
                                },
                                {
                                    value : 'Georgia'
                                },
                                {
                                    value : 'Palatino Linotype'
                                },
                                {
                                    value : 'Book Antiqua'
                                },
                                {
                                    value : 'Helvetica'
                                },
                                {
                                    value : 'Arial Black'
                                },
                                {
                                    value : 'Impact'
                                },
                                {
                                    value : 'Lucida Sans Unicode'
                                },
                                {
                                    value : 'Tahoma'
                                },
                                {
                                    value : 'Verdana'
                                },
                                {
                                    value : 'Courier New'
                                },
                                {
                                    value : 'Lucida Console'
                                },
                                {
                                    value : 'initial'
                                }
                            ]
                        }
                    },
                    fontSize : {
                        displayName  : 'Font Size',
                        defaultValue : 14,
                        input : 'number',
                        inputParams : {
                            min: 1,
                            max: 1000
                        }
                    },
                    fontWeight : {
                        displayName : 'Font Weight',
                        defaultValue : 100,
                        input : 'range',
                        inputParams : {
                            labelValues : [100,900],
                            min: 100,
                            max: 900,
                            stepSize : 100
                        }
                    },
                    fontStyle : {
                        displayName : 'Font Style',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'italic',
                                    icon : 'italic',
                                    toogle : true
                                }
                            ]
                        }
                    },
                    textDecoration: {
                        displayName : 'Text Decoration',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'line-through',
                                    icon : 'strikethrough',
                                    toogle : true
                                },
                                {
                                    value : 'underline',
                                    icon : 'underline',
                                    toogle : true
                                }
                            ]
                        }
                    }
                },
                buttonStyle : {
                    collapse : true,
                    buttonColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    },
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    },
                    horizontalAlignment : {
                        displayName : 'Horizontal Alignment',
                        defaultValue : 'center',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'flex-start',
                                    icon : 'align-left',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'align-center',
                                    toogle : false
                                },
                                {
                                    value : 'flex-end',
                                    icon : 'align-right',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    verticalAlignment : {
                        displayName : 'Vertical Alignment',
                        defaultValue : 'center',
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'flex-start',
                                    icon : 'alignment-top',
                                    toogle : false
                                },
                                {
                                    value : 'center',
                                    icon : 'vertical-distribution',
                                    toogle : false
                                },
                                {
                                    value : 'flex-end',
                                    icon : 'alignment-bottom',
                                    toogle : false
                                }
                            ]
                        }
                    },
                    cursor : {
                        displayName : 'Cursor',
                        defaultValue : 'default',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'default'
                                },
                                {
                                    value : 'pointer'
                                }
                            ]
                        }
                    }    
                },
                radius : {
                    collapse : false,
                    borderTopLeftRadius : {
                        displayName  : 'Top Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderTopRightRadius : {
                        displayName  : 'Top Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomLeftRadius : {
                        displayName  : 'Bottom Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    },
                    borderBottomRightRadius : {
                        displayName  : 'Bottom Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 1000
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                },
                border : {
                    collapse : false,
                    borderColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    borderWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    borderType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                margin : {
                    collapse : false,
                    marginTop : {
                        displayName  : 'Margin Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginBottom : {
                        displayName  : 'Margin Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginLeft : {
                        displayName  : 'Margin Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    },
                    marginRight : {
                        displayName  : 'Margin Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: -100,
                            max: 100
                        }
                    }
                }
            },
            hover : {
                helperText : {
                    value : 'The default style when the component is hover.',
                    // video : '/helperTextVideo/button_hover_helper_text.mp4',
                    // link : 'https://nextjs.org/learn/basics/assets-metadata-css/assets'
                },
                transition : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    }
                },
                buttonStyle : {
                    collapse : true,
                    buttonColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    },
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    },
                },
                typography : {
                    collapse : true,
                    fontColor : {
                        displayName : 'Font Color',
                        defaultValue : {
                            r : 0,
                            g : 0,
                            b : 0,
                            a : 1
                        },
                        input : 'colorPicker',
                    },
                    fontSize : {
                        displayName  : 'Font Size',
                        defaultValue : 14,
                        input : 'number',
                        inputParams : {
                            min: 1,
                            max: 1000
                        }
                    },
                    fontWeight : {
                        displayName : 'Font Weight',
                        defaultValue : 100,
                        input : 'range',
                        inputParams : {
                            labelValues : [100,900],
                            min: 100,
                            max: 900,
                            stepSize : 100
                        }
                    },
                    fontStyle : {
                        displayName : 'Font Style',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'italic',
                                    icon : 'italic',
                                    toogle : true
                                }
                            ]
                        }
                    },
                    textDecoration: {
                        displayName : 'Text Decoration',
                        defaultValue : null,
                        input : 'buttonGroup',
                        inputParams: {
                            options : [
                                {
                                    value : 'line-through',
                                    icon : 'strikethrough',
                                    toogle : true
                                },
                                {
                                    value : 'underline',
                                    icon : 'underline',
                                    toogle : true
                                }
                            ]
                        }
                    }
                },
                border : {
                    collapse : true,
                    borderColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    borderWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    borderType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                }
            },
            click : {
                transition : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    }
                },
                buttonStyle : {
                    collapse : true,
                    buttonColor : {
                        displayName : 'Background Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker',
                        helperText : 'Set background color of the grid, including the alpha layer.'
                    }  
                },
                border : {
                    collapse : true,
                    borderColor : {
                        displayName : 'Border Color',
                        // defaultValue : 'rgba(255,255,255,1)',
                        defaultValue : {
                            r : 255,
                            g : 255,
                            b : 255,
                            a : 1
                        },
                        input : 'colorPicker'
                    },
                    borderWidth: {
                        displayName : 'Border Width',
                        defaultValue : 0,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,20],
                            min: 0,
                            max: 20
                        }
                    },
                    borderType: {
                        displayName : 'Border Style',
                        defaultValue : 'solid',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    value : 'solid'
                                },
                                {
                                    value : 'dashed'
                                },
                                {
                                    value : 'dotted'
                                },
                                {
                                    value : 'double'
                                }
                            ]
                        }
                    }
                },
                padding  : {
                    collapse : false,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                }
            },
            initiation : {
                animation : {
                    collapse : true,
                    transitionDuration : {
                        displayName : 'Transition Time',
                        defaultValue : 0.5,
                        input : 'range',
                        inputParams : {
                            min : 0,
                            max : 1,
                            stepSize : 0.1
                        }
                    },
                    opacity : {
                        displayName : 'Opacity',
                        defaultValue : 1,
                        input : 'range',
                        inputParams : {
                            labelValues : [0,1],
                            stepSize : 0.1,
                            min: 0,
                            max: 1
                        }
                    },
                    direction : {
                        displayName : 'Initial Direction',
                        defaultValue : 'none',
                        input : 'options',
                        inputParams: {
                            options : [
                                {
                                    displayName : 'None',
                                    value : 'none'
                                },
                                {
                                    displayName : 'From Bottom',
                                    value : 'bottom'
                                },
                                {
                                    displayName : 'From Top',
                                    value : 'top'
                                },
                                {
                                    displayName : 'From Left',
                                    value : 'left'
                                },
                                {
                                    displayName : 'From Right',
                                    value : 'right'
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    googleMap : {
        icon : 'path-search',
        state : ['default'],
        props : {
            default : {
                map : {
                    collapse : true,
                    mapSrc : {
                        displayName : 'Address',
                        defaultValue : null,
                        input : 'text',
                        helperText : 'Enter the address of the marker on the Google Map'
                    },
                    zoom : {
                        displayName : 'Zoom Level',
                        defaultValue : 16,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 21
                        }
                    }
                },
                padding  : {
                    collapse : true,
                    paddingTop : {
                        displayName  : 'Padding Top',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingBottom : {
                        displayName  : 'Padding Bottom',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingLeft: {
                        displayName  : 'Padding Left',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    },
                    paddingRight: {
                        displayName  : 'Padding Right',
                        defaultValue : 0,
                        input : 'number',
                        inputParams : {
                            min: 0,
                            max: 100
                        }
                    }
                }
            }
        }
    }
}