import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const invoiceRef = useRef();

  /* ================= FETCH ORDER ================= */
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    console.log("USER ID:", userId);

    if (!userId) {
      console.log("User not logged in");
      return;
    }

    axios
      .get(`http://localhost/Jewellerydb/getUserOrders.php?user_id=${userId}`)
      .then((res) => {
        console.log("API DATA:", res.data);

        const order = res.data.data?.find(
          (o) => String(o.order_id) === String(orderId)
        );

        console.log("FOUND ORDER:", order);

        setData(order);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  /* ================= DOWNLOAD PDF ================= */
  const downloadPDF = async () => {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 295;

    let heightLeft = imgHeight;
    let position = 0;

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

  /* ================= SAFETY ================= */
  if (!data) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">
          Loading or No Invoice Found...
        </div>
        <Footer />
      </>
    );
  }

  /* ================= TOTAL ================= */
  const orderTotal = Number(data.final_price || 0);

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div
          ref={invoiceRef}
          className="p-4 bg-white shadow rounded"
          style={{ maxWidth: "800px", margin: "auto" }}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold">HP jewellery</h3>
              <p className="mb-0">Surat, Gujarat</p>
            </div>

            <div className="text-end">
              <h4 className="fw-bold">Invoice</h4>
              <p className="mb-0">#INV-{data.order_id}</p>
              <p className="mb-0">{data.order_date}</p>
            </div>
          </div>

          <hr />

          {/* CUSTOMER */}
          <div className="mb-4">
            <h5 className="fw-bold">Billing Details</h5>
            <p className="mb-1">
              <strong>Name:</strong> {data.customer_name || "-"}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {data.customer_email || "-"}
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> {data.customer_phone || "-"}
            </p>
            <p className="mb-0">
              <strong>Address:</strong> {data.shipping_address || "-"}
            </p>
          </div>

          {/* TABLE */}
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{data.product_name}</td>
                <td>₹{Number(data.price || 0).toFixed(2)}</td>
                <td>{data.quantity}</td>
                <td>
                  {Number(data.discount_amount) > 0
                    ? `₹${data.discount_amount}`
                    : "-"}
                </td>
                <td>₹{Number(data.final_price || 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="text-end mt-4">
            <h5>
              <strong>Total: ₹{orderTotal.toFixed(2)}</strong>
            </h5>
          </div>

          <hr />

          {/* FOOTER */}
          <p className="text-center text-muted small">
            Thank you for your purchase!
          </p>
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={downloadPDF}
            className="btn btn-success mt-4 px-4"
          >
            Download PDF
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Invoice;