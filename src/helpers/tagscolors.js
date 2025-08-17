export const tagColors = {
  floral: "bg-pink-300",      
  fresco: "bg-green-300",     
  amaderado: "bg-yellow-500",  
  cítrico: "bg-orange-300",  
  dulce: "bg-purple-300",     
  especiado: "bg-red-400",     
  acuático: "bg-blue-300",     
  almizclado: "bg-purple-500",  
  oriental: "bg-amber-400",   
  verde: "bg-lime-400",      
  frutal: "bg-rose-300",     
  vainilla: "bg-amber-300",   
  empolvado: "bg-slate-300",  
  cuero: "bg-stone-500",       
  ámbar: "bg-yellow-400",    
};

export const getTagColor = (tagName) => {
  return tagColors[tagName.toLowerCase()] || "bg-green-200";
};