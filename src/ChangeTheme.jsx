export default function ChangeTheme({ theme, setTheme }) {
  const iconColor = theme === 'light' ? '#000000' : '#ffffff';

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.style.setProperty('--text-color', newTheme === 'light' ? 'rgba(29, 29, 29, 0.87)' : 'rgba(255, 255, 255, 0.87)');
    document.documentElement.style.setProperty('--bg-color', newTheme === 'light' ? '#ececec' : '#242424');

    localStorage.setItem('mood-calendar-theme', newTheme);
  }

  return (
    <div onClick={changeTheme} style={{position: 'absolute', top: 24, right: 24, cursor: 'pointer', /*border: `2px solid ${iconColor}`,*/ padding: '5px', paddingBottom: '0px', borderRadius: '100%'}}>
      { theme === 'light' ?
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <title xmlns="">moon-stars-rounded</title>
          <path fill={iconColor} d="M12.075 22q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2t-.8-3.938q0-3.1 1.713-5.625t4.587-3.7q.35-.125.725-.088t.625.238q.2.175.313.488t.112.812q.05 1.975.8 3.763T13 10.975t3.2 2.15t3.775.8q.525 0 .8.088t.45.287q.2.25.263.65t-.063.725q-1.15 2.875-3.7 4.6T12.075 22M14.3 7.3l-1.6-1.6q-.3-.3-.3-.7t.3-.7l1.6-1.6q.3-.3.7-.3t.7.3l1.6 1.6q.3.3.3.7t-.3.7l-1.6 1.6q-.3.3-.7.3t-.7-.3m5 3l-.6-.6q-.3-.3-.3-.7t.3-.7l.6-.6q.3-.3.7-.3t.7.3l.6.6q.3.3.3.7t-.3.7l-.6.6q-.3.3-.7.3t-.7-.3"/>
        </svg>
      :
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <title xmlns="">wb-sunny-rounded</title>
          <path fill={iconColor} d="M11 3V2q0-.425.288-.712T12 1t.713.288T13 2v1q0 .425-.288.713T12 4t-.712-.288T11 3m0 19v-1q0-.425.288-.712T12 20t.713.288T13 21v1q0 .425-.288.713T12 23t-.712-.288T11 22m11-9h-1q-.425 0-.712-.288T20 12t.288-.712T21 11h1q.425 0 .713.288T23 12t-.288.713T22 13M3 13H2q-.425 0-.712-.288T1 12t.288-.712T2 11h1q.425 0 .713.288T4 12t-.288.713T3 13m16.75-7.325l-.35.35q-.275.275-.687.275T18 6q-.275-.275-.288-.687t.263-.713l.375-.375q.275-.3.7-.3t.725.3t.288.725t-.313.725M6.025 19.4l-.375.375q-.275.3-.7.3t-.725-.3t-.288-.725t.313-.725l.35-.35q.275-.275.688-.275T6 18q.275.275.288.688t-.263.712m12.3.35l-.35-.35q-.275-.275-.275-.687T18 18q.275-.275.688-.287t.712.262l.375.375q.3.275.3.7t-.3.725t-.725.288t-.725-.313M4.6 6.025l-.375-.375q-.3-.275-.3-.7t.3-.725t.725-.288t.725.313l.35.35q.275.275.275.688T6 6q-.275.275-.687.288T4.6 6.025M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"/>
        </svg>
      }
    </div>
  )
}
