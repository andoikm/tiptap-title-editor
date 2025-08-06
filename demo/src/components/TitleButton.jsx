import { useState } from 'react';

const TitleButton = ({ editor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleText, setTitleText] = useState('');



  const handleAddTitle = () => {
    if (!editor || !titleText.trim()) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      alert('Please select some text first!');
      return;
    }

    editor.chain().focus().setTitle({ title: titleText.trim() }).run();
    setTitleText('');
    setIsModalOpen(false);
  };

  const handleRemoveTitle = () => {
    if (!editor) return;
    editor.chain().focus().unsetTitle().run();
  };

  const isTitleActive = editor?.isActive('title');

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Title
        </button>
        {isTitleActive && (
          <button 
            onClick={handleRemoveTitle}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Remove Title
          </button>
        )}
      </div>

      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              minWidth: '300px',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3>Add Title</h3>
            <p>Enter a title for the selected text:</p>
            <input
              type="text"
              value={titleText}
              onChange={e => setTitleText(e.target.value)}
              placeholder="Enter title..."
              autoFocus
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddTitle();
                } else if (e.key === 'Escape') {
                  setIsModalOpen(false);
                }
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleAddTitle} 
                disabled={!titleText.trim()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Add Title
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TitleButton;
