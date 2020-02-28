const {__} = wp.i18n;
const {useEffect, useState} = wp.element;

const Sections = (props) => {
    const endpoint = 'http://qubely.io/wp-json/restapi/v2/sections',
        block = typeof props.block !== 'undefined' ? props.block : '';
    useEffect(() => {
        fetch(endpoint, {
            method: 'POST'
        })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(response => {
                console.log('Previous: >>>', response);
                const filteredResponse = response.filter(item => (
                    typeof item.included_blocks !== 'undefined' &&
                    item.included_blocks.length &&
                    item.included_blocks.filter(item => item.value === block).length
                ));
                console.log('Previous: >>>', filteredResponse);
            })
            .catch( (err) => {
                // There was an error
                setLoaded(true);
                console.warn('Something went wrong.', err);
            });
    }, []);

    return <span>I'm Sections</span>
};

export default Sections