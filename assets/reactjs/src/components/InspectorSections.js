import './css/inspectorSections.scss';
const {
    element: {
        useEffect,
        useState
    },
    i18n: {__},
    data: {withDispatch},
    blocks: {parse}
} = wp;


const Sections = (props) => {
    const [sections, setSections] = useState([]);
    const block = typeof props.block !== 'undefined' ? props.block : '';
    const storeName = '__qubely_section_blocks_' + block;
    const storeNameDate = '__qubely_section_blocks_date_' + block;

    useEffect(() => {
        const today = new Date();
        const endpoint = 'http://qubely.io/wp-json/restapi/v2/sections';
        const _fetchData = () => {
            fetch(endpoint, {
                method: 'POST',
                body: block ? new URLSearchParams('block_name='+block) : ''
            })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(response => {
                const cacheExp = new Date().setDate(today.getDate() + 7);
                // const filteredResponse = response.filter(item => (
                //     typeof item.included_blocks !== 'undefined' && item.included_blocks.length && item.included_blocks.filter(item => item.value === (block)).length
                // ));
                setSections(response);
                _syncSections(response);
                window.localStorage.setItem(storeName, JSON.stringify(response));
                window.localStorage.setItem(storeNameDate, JSON.stringify(cacheExp));
            })
            .catch( (err) => {
                console.warn('Something went wrong.', err);
            });
        };

        const sectionData = JSON.parse(window.localStorage.getItem(storeName));
        if(sectionData !== null) {
            const sectionExpDate = JSON.parse(window.localStorage.getItem(storeNameDate));
            if(sectionExpDate !== null && today > sectionExpDate ){
                window.localStorage.clear(storeName);
                window.localStorage.clear(storeNameDate);
                _fetchData();
            }else{
                setSections(sectionData)
            }
        }else{
            window.localStorage.clear(storeName);
            window.localStorage.clear(storeNameDate);
            _fetchData();
        }

        const _syncSections = sections => {
            sections.forEach(section => {
                _fetchSection(section.ID);
            })
        }

    }, []);

    const _fetchSection = (section_id, callback) => {
        const endpoint = 'https://qubely.io/wp-json/restapi/v2/single-section';
        fetch(endpoint, {
            method: 'POST',
            body: new URLSearchParams('section_id='+ section_id)
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(response => {
            window.localStorage.setItem(storeName + section_id, JSON.stringify(response.rawData));
            callback && callback();
        })
        .catch( err => {
            console.warn('Something went wrong.', err);
        });
    }


    const _insertSection = section_id => {
        const {insertBlocks} = props
        const sectionData = JSON.parse(window.localStorage.getItem(storeName + section_id));
        if(sectionData !== null){
            insertBlocks(parse(sectionData));
        }else{
            _fetchSection(section_id, () => {
                const sectionData = JSON.parse(window.localStorage.getItem(storeName + section_id));
                insertBlocks(parse(sectionData));
            })
        }
    }

    return (
        <div className='qubely-block-sections'>
            {
                sections.map(section => (
                    <div className='qubely-block-section'>
                        <img width='330' height='230' loading='lazy' src={section.image} alt={section.name} />
                        <div className="qubely-block-section-btns">
                            <button onClick={() => _insertSection(section.ID)}>{__('Import')}</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default withDispatch((dispatch) => ({ insertBlocks : dispatch('core/block-editor').insertBlocks }))(Sections)