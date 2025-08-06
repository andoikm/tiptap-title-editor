import { useState } from 'react';
import './TitleButton.css';

const TitleButton = ({ editor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleText, setTitleText] = useState('');

  const handleAddTitle = () => {
    if (!editor || !titleText.trim()) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      // eslint-disable-next-line no-alert
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
      <div className='title-buttons'>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={
            !editor?.state.selection.empty &&
            editor?.state.selection.from === editor?.state.selection.to
          }
          className='title-button'
        >
          +
        </button>
        {isTitleActive && (
          <button onClick={handleRemoveTitle} className='title-button remove'>
            -
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={() => setIsModalOpen(false)}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <h3>Add Title</h3>
            <p>Enter a title for the selected text:</p>
            <input
              type='text'
              value={titleText}
              onChange={e => setTitleText(e.target.value)}
              placeholder='Enter title...'
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddTitle();
                } else if (e.key === 'Escape') {
                  setIsModalOpen(false);
                }
              }}
            />
            <div className='modal-actions'>
              <button onClick={handleAddTitle} disabled={!titleText.trim()}>
                Add Title
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TitleButton;
