const defaultInteraction = {
    while_scroll_into_view: {
        enable: false,
        action_list: [
            {
                id: 'b3fdc1c1e6bfde5942ea',
                index: 0,
                keyframe: 0,
                name: 'move',
                property: {
                    x: 0,
                    y: -100,
                    z: 0,
                },
                range: {
                    max: 1000,
                    min: -1000,
                    step: 1
                },
                single: true,
                title: "Move",
            },
            {
                id: '936e0225e6dc8edfba7d',
                index: 1,
                keyframe: 100,
                name: 'move',
                property: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                range: {
                    max: 1000,
                    min: -1000,
                    step: 1
                },
                single: true,
                title: "Move",
            },
        ],
        transform_origin_x: 'center',
        transform_origin_y: 'center',
        enable_mobile: false,
        enable_tablet: false
    },
    mouse_movement: {
        enable: false,
        mouse_tilt_direction: 'Direct',
        mouse_tilt_speed: 1,
        mouse_tilt_max: 15,
        enable_mobile: false,
        enable_tablet: false
    }
}


const interactionActions = [
    {
        name: 'move', 
        title: "Move",  
        property: {
            x: 0,
            y: -100,
            z: 0,
        },
        range: {
            max: 1000,
            min: -1000,
            step: 1
        },
    },
    { 
        name: 'scale', 
        title: "Scale",
        property: {
            x: 1,
            y: 1,
            z: 1,
        },
        range: {
            max: 3,
            min: 0,
            step: 0.1
        },
    },
    {
        name: 'rotate', 
        title: "Rotate",
        property: {
            x: 0,
            y: -100,
            z: 0,
        },
        range: {
            max: 1000,
            min: -1000,
            step: 1
        } 
    },
    {
        name: 'skew', 
        title: "Skew",
        property: {
            x: 0,
            y: -100
        },
        range: {
            max: 80,
            min: -80,
            step: 1
        } 
    },
    {
        name: 'opacity', 
        title: "Opacity",
        property: {
            value: 0
        },
        range: {
            max: 1,
            min: 0,
            step: 0.1
        } 
    },
    {
        name: 'blur', 
        title: "Blur",
        property: {
            value: 0
        },
        range: {
            max: 100,
            min: 0,
            step: 1
        } 
    },
]

export { defaultInteraction, interactionActions }