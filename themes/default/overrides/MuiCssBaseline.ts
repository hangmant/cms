export default {
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(100,100,100,.4)',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      backgroundColor: 'rgba(100,100,100,.2)',
      marginRight: '1px',
      WebkitTransition: 'opacity .3s ease-in-out',
      transition: 'opacity .3s ease-in-out',
    },
  },
}
