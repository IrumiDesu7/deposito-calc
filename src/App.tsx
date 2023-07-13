import React, { useState, ChangeEvent, useEffect } from "react";
import "./App.css";

interface FormValues {
  depositoAwal: number | null;
  tenor: number | null;
  bunga: number | null;
  pajak: number | null;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    depositoAwal: null,
    tenor: null,
    bunga: null,
    pajak: 20,
  });

  const [result, setResult] = useState({
    bungaSebelumPajak: 0,
    bungaSetelahPajak: 0,
    danaSetelahTenor: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    const { depositoAwal, tenor, bunga, pajak } = formData;
    if (depositoAwal && tenor && bunga && pajak) {
      const bungaSebelumPajak = (depositoAwal * (bunga / 12) * tenor) / 100;
      const bungaSetelahPajak =
        bungaSebelumPajak * ((100 - (pajak ?? 0)) / 100);
      const danaSetelahTenor = depositoAwal + bungaSetelahPajak;
      setResult({
        bungaSebelumPajak,
        bungaSetelahPajak,
        danaSetelahTenor,
      });
    }
  }, [formData]);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Kalkulator Deposito</h1>
        <label htmlFor="depositoAwal">Dana Deposito Awal:</label>
        <input
          type="number"
          name="depositoAwal"
          value={formData.depositoAwal ?? ""}
          onChange={handleChange}
          placeholder="10000000"
        />

        <label htmlFor="tenor">Tenor Deposito (Bulan):</label>
        <input
          type="number"
          name="tenor"
          value={formData.tenor ?? ""}
          onChange={handleChange}
          placeholder="3"
        />

        <label htmlFor="bunga">Bunga Deposito Tahunan (%):</label>
        <input
          type="number"
          name="bunga"
          value={formData.bunga ?? ""}
          onChange={handleChange}
          placeholder="5.25"
          step="0.01"
        />

        <label htmlFor="pajak">Pajak Bunga Deposito (%):</label>
        <input
          type="number"
          name="pajak"
          value={formData.pajak ?? ""}
          // onChange={handleChange} commented to make the value unchangeable, simply uncomment to make it changeable
          placeholder="Pajak"
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2>Hasil Kalkulasi</h2>
        <ul>
          <li>Bunga (Sebelum Pajak) : {result.bungaSebelumPajak}</li>
          <li>Bunga (Setelah Pajak) : {result.bungaSetelahPajak}</li>
          <li>Dana Setelah Tenor Berakhir : {result.danaSetelahTenor}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
