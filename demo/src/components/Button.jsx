export const Button = ({title, isActive, onClick, children}) => {
    return (
        <button title={title} onClick={onClick} style={{
            padding: '6px 12px',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            backgroundColor: isActive ? '#3b82f6' : 'rgb(36 36 36)',
            color: isActive ? 'rgb(36 36 36)' : '#c4c4c4',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
        }}>
            {children}
        </button>
    );
};
