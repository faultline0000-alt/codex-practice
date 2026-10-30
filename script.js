"use strict";

// DOM과 독립적인 계산 함수: 중간 금액은 반올림하지 않습니다.
function calculateCompound(principal, rate, years) {
  if (!Number.isSafeInteger(principal) || principal < 1 || principal > 1e12) {
    throw new Error("초기 투자금액은 1원부터 1조 원 사이의 정수로 입력해 주세요.");
  }
  if (!Number.isFinite(rate) || rate < -100 || rate > 100) {
    throw new Error("연 수익률은 -100%부터 100% 사이의 숫자로 입력해 주세요.");
  }
  if (!Number.isInteger(years) || years < 1 || years > 100) {
    throw new Error("투자기간은 1년부터 100년 사이의 정수로 입력해 주세요.");
  }
  const rows = [];
  for (let year = 0; year <= years; year += 1) {
    const value = principal * (1 + rate / 100) ** year;
    if (!Number.isFinite(value) || value > Number.MAX_SAFE_INTEGER) {
      throw new Error("계산 결과가 정확하게 표시할 수 있는 금액을 초과합니다. 투자금액, 수익률 또는 기간을 줄여 주세요.");
    }
    rows.push({ year, value, profit: value - principal });
  }
  return rows;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("calculator");
  const principalInput = document.getElementById("principal");
  const rateInput = document.getElementById("rate");
  const yearsInput = document.getElementById("years");
  const error = document.getElementById("error");
  const money = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const amount = value => `${money.format(Math.round(value) || 0)}원`;

  function render() {
    const inputs = [principalInput, rateInput, yearsInput];
    inputs.forEach(input => input.removeAttribute("aria-invalid"));
    error.textContent = "";
    try {
      const raw = principalInput.value.trim();
      if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(raw)) {
        principalInput.setAttribute("aria-invalid", "true");
        throw new Error("초기 투자금액은 숫자 또는 올바른 천 단위 쉼표 형식으로 입력해 주세요.");
      }
      if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(rateInput.value.trim())) {
        rateInput.setAttribute("aria-invalid", "true");
        throw new Error("연 수익률에 올바른 숫자를 입력해 주세요.");
      }
      if (!/^\d+$/.test(yearsInput.value.trim())) {
        yearsInput.setAttribute("aria-invalid", "true");
        throw new Error("투자기간은 정수로 입력해 주세요.");
      }
      const principal = Number(raw.replaceAll(",", ""));
      const rate = Number(rateInput.value.trim());
      const years = Number(yearsInput.value.trim());
      if (!Number.isSafeInteger(principal) || principal < 1 || principal > 1e12) principalInput.setAttribute("aria-invalid", "true");
      if (!Number.isFinite(rate) || rate < -100 || rate > 100) rateInput.setAttribute("aria-invalid", "true");
      if (!Number.isInteger(years) || years < 1 || years > 100) yearsInput.setAttribute("aria-invalid", "true");
      const rows = calculateCompound(principal, rate, years);
      const last = rows[rows.length - 1];
      principalInput.value = money.format(principal);
      document.getElementById("final-value").textContent = amount(last.value);
      document.getElementById("initial-value").textContent = amount(principal);
      document.getElementById("profit-value").textContent = amount(last.profit);
      document.getElementById("result-description").textContent = `연 ${rate}%로 ${years}년간 투자한 예상 결과입니다.`;
      const body = document.getElementById("yearly-results");
      body.replaceChildren();
      rows.forEach(row => {
        const tr = document.createElement("tr");
        [row.year === 0 ? "시작" : `${row.year}년`, amount(row.value), amount(row.profit)].forEach(text => {
          const td = document.createElement("td");
          td.textContent = text;
          tr.append(td);
        });
        body.append(tr);
      });
    } catch (failure) {
      error.textContent = failure.message;
      document.getElementById("final-value").textContent = "계산할 수 없습니다";
      ["initial-value", "profit-value"].forEach(id => { document.getElementById(id).textContent = "—"; });
      document.getElementById("result-description").textContent = "입력값을 확인한 뒤 다시 계산해 주세요.";
      document.getElementById("yearly-results").replaceChildren();
      const invalid = inputs.find(input => input.getAttribute("aria-invalid") === "true");
      if (invalid) invalid.focus();
    }
  }
  form.addEventListener("submit", event => { event.preventDefault(); render(); });
  render();
}
