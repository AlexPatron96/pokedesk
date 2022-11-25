import React from 'react'

const Progress_bar = ({ bgcolor, progress, height, nameStat }) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'rgba(225, 225, 225, 0.809)',
        borderRadius: 40,
        margin: 10
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        fontWeight: 800,
        fontSize: 12
    }

    return (
        <div>
            <h1 className='statsTitle'>{nameStat?.toUpperCase()}</h1>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                    <span style={progresstext}>{`${progress}%`}</span>
                </div>
            </div>
        </div>
    )
}

export default Progress_bar;