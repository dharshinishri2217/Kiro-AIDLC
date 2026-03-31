export default function FinalInsight({ message, onRestart, user }) {
  const totalSims = user.totalSims || 0;
  const streak = user.streak || 1;
  const streakMsg =
    streak >= 7
      ? streak + "-day streak! You are deeply committed to this awareness."
      : streak >= 3
      ? streak + " days in a row! Your understanding is growing."
      : "Simulation " + totalSims + " complete. Come back tomorrow to build your streak!";

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4" style={{animation:"fadeInUp 0.5s ease forwards"}}>
      <div style={{background:"linear-gradient(to right,#f3e8ff,#fce7f3)",border:"2px solid #d8b4fe",borderRadius:"1rem",padding:"0.75rem 1.25rem",display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <span style={{fontSize:"1.5rem"}}></span>
        <p style={{fontSize:"0.875rem",fontWeight:"600",color:"#6b21a8",margin:0}}>{streakMsg}</p>
      </div>
      <div style={{background:"white",border:"2px solid #c7d2fe",borderRadius:"1.5rem",padding:"2rem",textAlign:"center",boxShadow:"0 20px 40px rgba(0,0,0,0.1)"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem"}}></div>
        <h2 style={{fontSize:"1.5rem",fontWeight:"700",color:"#312e81",marginBottom:"1rem"}}>Now you see it.</h2>
        <p style={{color:"#374151",lineHeight:"1.7",marginBottom:"1.25rem"}}>{message}</p>
        <hr style={{border:"none",borderTop:"1px solid #c7d2fe",margin:"1.25rem 0"}} />
        <p style={{color:"#6366f1",fontStyle:"italic",fontSize:"0.875rem",marginBottom:"1.5rem"}}>
          Invisible work is still work. Acknowledge it. Share it. Value it.
        </p>
        <button
          onClick={onRestart}
          style={{padding:"0.875rem 2rem",borderRadius:"1rem",fontWeight:"700",color:"white",fontSize:"1rem",border:"none",background:"linear-gradient(135deg,#7c3aed,#a855f7)",cursor:"pointer",boxShadow:"0 4px 15px rgba(124,58,237,0.4)"}}
        >
          Explore Another Perspective
        </button>
      </div>
      <p style={{textAlign:"center",fontSize:"0.875rem",color:"#9ca3af",fontStyle:"italic"}}>
        What invisible work do you carry or witness every day?
      </p>
    </div>
  );
}
