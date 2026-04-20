import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&display=swap');
  .jp-d{font-family:'Cinzel',serif;font-weight:600}
  .jp-s{font-family:'Cormorant Garamond',serif;font-weight:600}
  .jp-l{font-family:'Lato',sans-serif}
  .jp-div{background:linear-gradient(90deg,transparent,#c69e8f 30%,#6d4e19 50%,#c69e8f 70%,transparent);height:1px;border:none}
  .inv-table{width:100%;border-collapse:collapse;font-family:'Lato',sans-serif}
  .inv-table th{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#6d4e19;padding:10px 12px;border-bottom:1px solid rgba(109,78,25,.2);text-align:left;background:rgba(109,78,25,.04)}
  .inv-table td{font-size:13px;font-weight:700;color:#3d3228;padding:12px;border-bottom:0.5px solid rgba(188,193,194,.3)}
  .inv-table tr:last-child td{border-bottom:none}
  .jp-btn{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:13px 40px;background:linear-gradient(135deg,#6d4e19,#8b6520);color:#f5f6f5;border:none;cursor:pointer;transition:all .3s}
  .jp-btn:hover{background:linear-gradient(135deg,#5a3f14,#6d4e19);box-shadow:0 6px 24px rgba(109,78,25,.3)}
`;

const Invoice = () => {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { console.log("User not logged in"); return; }
    axios.get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((res) => {
        const order = res.data.data?.find((o) => String(o.order_id) === String(orderId));
        setData(order);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale:2, useCORS:true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 295;
    let heightLeft = imgHeight, position = 0;
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`invoice_${orderId}.pdf`);
  };

  if (!data) return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <p className="jp-d" style={{ color:"#bdc1c2", fontSize:13, letterSpacing:".2em", textTransform:"uppercase" }}>Loading invoice...</p>
      </div>
      <Footer />
    </>
  );

  const orderTotal = Number(data.final_price || 0);

  return (
    <>
      <style>{S}</style>
      <Navbar />
      <div style={{ background:"#f5f6f5", minHeight:"100vh" }}>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7 }}
          style={{ background:"linear-gradient(160deg,#faf8f4 0%,#f5efe6 60%,#faf8f4 100%)", padding:"52px 24px 44px", textAlign:"center", borderBottom:"1px solid rgba(188,193,194,.3)" }}>
          <p className="jp-l" style={{ color:"#c69e8f", fontSize:10, letterSpacing:".45em", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>✦ Purchase Record ✦</p>
          <h1 className="jp-d" style={{ color:"#6d4e19", fontSize:"clamp(24px,4vw,40px)", fontWeight:700, marginBottom:10 }}>Invoice</h1>
          <div className="jp-div" style={{ width:80, margin:"0 auto" }} />
        </motion.div>

        <div style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 96px" }}>

          {/* Invoice document */}
          <motion.div ref={invoiceRef} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.15 }}
            style={{ background:"white", border:"1px solid rgba(188,193,194,.35)", padding:"48px 48px 40px" }}>

            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36 }}>
              <div>
                <p className="jp-d" style={{ fontSize:22, fontWeight:700, color:"#6d4e19", letterSpacing:".1em", marginBottom:4 }}>HP JEWELS</p>
                <p className="jp-s" style={{ fontSize:12, fontStyle:"italic", color:"#c69e8f", letterSpacing:".2em" }}>Fine Jewellery</p>
                <p className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#74878b", marginTop:6 }}>Surat, Gujarat</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p className="jp-d" style={{ fontSize:14, fontWeight:700, color:"#6d4e19", letterSpacing:".12em", textTransform:"uppercase", marginBottom:6 }}>Invoice</p>
                <p className="jp-l" style={{ fontSize:13, fontWeight:700, color:"#3d3228" }}>#INV-{data.order_id}</p>
                <p className="jp-l" style={{ fontSize:12, fontWeight:700, color:"#74878b", marginTop:4 }}>{data.order_date}</p>
              </div>
            </div>

            <div className="jp-div" style={{ marginBottom:28 }} />

            {/* Billing */}
            <div style={{ marginBottom:28 }}>
              <p className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".25em", textTransform:"uppercase", color:"#c69e8f", marginBottom:14 }}>Billing Details</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
                {[
                  { label:"Name", value:data.customer_name || "-" },
                  { label:"Email", value:data.customer_email || "-" },
                  { label:"Phone", value:data.customer_phone || "-" },
                  { label:"Address", value:data.shipping_address || "-" },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="jp-l" style={{ fontSize:9, fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#bdc1c2", marginBottom:3 }}>{r.label}</p>
                    <p className="jp-s" style={{ fontSize:14, fontWeight:600, color:"#3d3228", lineHeight:1.5 }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="jp-div" style={{ marginBottom:24 }} />

            {/* Items table */}
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th style={{ textAlign:"right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.product_name}</td>
                  <td>₹ {Number(data.price || 0).toFixed(2)}</td>
                  <td>{data.quantity}</td>
                  <td>{Number(data.discount_amount) > 0 ? `₹ ${data.discount_amount}` : "-"}</td>
                  <td style={{ textAlign:"right" }}>₹ {Number(data.final_price || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Total */}
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:24, paddingTop:16, borderTop:"1px solid rgba(109,78,25,.15)" }}>
              <div style={{ textAlign:"right" }}>
                <p className="jp-l" style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#c69e8f", marginBottom:6 }}>Amount Due</p>
                <p className="jp-d" style={{ fontSize:24, fontWeight:700, color:"#6d4e19" }}>₹ {orderTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="jp-div" style={{ margin:"28px 0 20px" }} />

            {/* Footer note */}
            <p className="jp-s" style={{ textAlign:"center", fontStyle:"italic", fontSize:14, fontWeight:600, color:"#bdc1c2" }}>
              Thank you for choosing HP Jewels — every piece, a piece of eternity.
            </p>
          </motion.div>

          {/* Download button */}
          <div style={{ textAlign:"center", marginTop:28 }}>
            <button className="jp-btn" onClick={downloadPDF}>↓ Download PDF</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Invoice;