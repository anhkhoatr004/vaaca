import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        capabilities: "Capabilities",
        industries: "Industries",
        supplyChain: "Supply Chain",
        contact: "Contact",
        quote: "Get a Quote"
      },
      hero: {
        badge: "Vietnam Advanced Aerospace & Components Alliance",
        titleLine1: "Precision Manufacturing &",
        titleLine2: "Advanced Supply Chain",
        titleLine3: "Partner from Vietnam.",
        desc: "VAACA is a pioneering Vietnamese company specializing in high-precision manufacturing, advanced machining, and integrated supply chain solutions for global OEMs.",
        btnPrimary: "Explore Capabilities",
        btnSecondary: "Supply Chain Services",
        status: "SYSTEM STATUS: ONLINE",
        cnc: "CNC Precision",
        cncDesc: "Multi-axis / Micron tolerance"
      },
      trust: {
        sub: "Global Supply Chain Integration",
        title: "Trusted by global OEMs and Tier-1 suppliers."
      },
      capabilities: {
        sub: "Core Competencies",
        title: "Manufacturing Capabilities",
        desc: "We combine state-of-the-art technology with skilled craftsmanship to deliver critical components.",
        items: [
          {
            title: "Precision Manufacturing",
            description: "High-precision CNC machining for complex aerospace and automotive components.",
            f1: "5-Axis CNC Machining",
            f2: "Metal & Composite Materials",
            f3: "Micron-level Tolerance",
            spec: "TOL: +/- 0.002mm"
          },
          {
            title: "Advanced Assembly",
            description: "Full-spectrum assembly services from sub-modules to complete mechanical units.",
            f1: "Module Integration",
            f2: "Box-build Assembly",
            f3: "Digital Traceability",
            spec: "AS9100 REV D"
          },
          {
            title: "Engineering & DFM",
            description: "Engineering support to optimize manufacturing processes and reduce costs.",
            f1: "DFM / DFA Consulting",
            f2: "Process Optimization",
            f3: "Rapid Prototyping",
            spec: "CATIA / NX"
          }
        ]
      },
      industries: {
        sub: "Sectors We Serve",
        title: "Industry Applications",
        items: [
          {
            title: "Aerospace & Defense",
            subtitle: "AS9100 Certified",
            description: "We supply critical components for commercial aircraft engines, landing gear systems, and interior structural parts.",
            app1: "Turbine Blades",
            app2: "Landing Gear Parts",
            app3: "Structural Brackets"
          },
          {
            title: "Automotive & EV",
            subtitle: "IATF 16949 Standards",
            description: "Supporting the transition to Electric Vehicles with lightweight aluminum components and high-precision motor housings.",
            app1: "EV Motor Housings",
            app2: "Transmission Shafts",
            app3: "Battery Enclosures"
          },
          {
            title: "Medical Devices",
            subtitle: "ISO 13485 Compliance",
            description: "Manufacturing surgical instruments and orthopedic implants using medical-grade Titanium and Stainless Steel.",
            app1: "Surgical Instruments",
            app2: "Orthopedic Implants",
            app3: "Diagnostic Equipment"
          }
        ]
      },
      supplyChain: {
        sub: "Beyond Manufacturing",
        titleLine1: "We Orchestrate the",
        titleLine2: "Global Supply Chain",
        desc: "VAACA provides not just parts, but a complete ecosystem. We manage the complexity of sourcing, auditing, and logistics so you don't have to.",
        steps: [
          {
            title: "Supplier Assessment",
            desc: "Rigorous evaluation of sub-tier suppliers."
          },
          {
            title: "Process Audits",
            desc: "On-site verification of manufacturing protocols."
          },
          {
            title: "Risk Management",
            desc: "Proactive identification of supply bottlenecks."
          },
          {
            title: "Digital Traceability",
            desc: "Full lifecycle tracking from raw material to finish."
          }
        ],
        stats: {
          delivery: "On-Time Delivery",
          defect: "Defect Rate",
          cycle: "Production Cycle",
          status: "Supplier Status"
        }
      },
      footer: {
        explore: "Explore",
        contact: "Contact",
        address: "Lot C4, High-Tech Park,<br />Ho Chi Minh City, Vietnam.",
        rights: "© 2024 VAACA. All rights reserved."
      }
    }
  },
  vn: {
    translation: {
      nav: {
        capabilities: "Năng lực",
        industries: "Ngành hàng",
        supplyChain: "Chuỗi cung ứng",
        contact: "Liên hệ",
        quote: "Nhận báo giá"
      },
      hero: {
        badge: "Liên minh Linh kiện & Hàng không Vũ trụ Tiên tiến VN",
        titleLine1: "Đối tác Sản xuất Chính xác &",
        titleLine2: "Chuỗi Cung ứng Tiên tiến",
        titleLine3: "từ Việt Nam.",
        desc: "VAACA là công ty tiên phong tại Việt Nam chuyên sản xuất cơ khí chính xác, gia công tiên tiến và các giải pháp chuỗi cung ứng tích hợp cho các OEM toàn cầu.",
        btnPrimary: "Khám phá Năng lực",
        btnSecondary: "Dịch vụ Chuỗi cung ứng",
        status: "TRẠNG THÁI: TRỰC TUYẾN",
        cnc: "Gia công CNC",
        cncDesc: "Đa trục / Dung sai micron"
      },
      trust: {
        sub: "Tích hợp Chuỗi Cung ứng Toàn cầu",
        title: "Được tin cậy bởi các OEM toàn cầu và nhà cung cấp Tier-1."
      },
      capabilities: {
        sub: "Năng lực Cốt lõi",
        title: "Năng lực Sản xuất",
        desc: "Chúng tôi kết hợp công nghệ hiện đại với tay nghề kỹ thuật cao để cung cấp các linh kiện quan trọng.",
        items: [
          {
            title: "Sản xuất Chính xác",
            description: "Gia công CNC chính xác cao cho các linh kiện phức tạp ngành hàng không và ô tô.",
            f1: "Gia công CNC 5 trục",
            f2: "Vật liệu Kim loại & Composite",
            f3: "Dung sai cấp độ Micron",
            spec: "Dung sai: +/- 0.002mm"
          },
          {
            title: "Lắp ráp Tiên tiến",
            description: "Dịch vụ lắp ráp toàn diện từ các module phụ đến các đơn vị cơ khí hoàn chỉnh.",
            f1: "Tích hợp Module",
            f2: "Lắp ráp Box-build",
            f3: "Truy xuất nguồn gốc số",
            spec: "Chuẩn: AS9100 REV D"
          },
          {
            title: "Kỹ thuật & DFM",
            description: "Hỗ trợ kỹ thuật để tối ưu hóa quy trình sản xuất và giảm thiểu chi phí.",
            f1: "Tư vấn DFM / DFA",
            f2: "Tối ưu hóa quy trình",
            f3: "Tạo mẫu nhanh",
            spec: "Phần mềm: CATIA / NX"
          }
        ]
      },
      industries: {
        sub: "Lĩnh vực Phục vụ",
        title: "Ứng dụng Ngành",
        items: [
          {
            title: "Hàng không & Quốc phòng",
            subtitle: "Chứng nhận AS9100",
            description: "Chúng tôi cung cấp linh kiện quan trọng cho động cơ máy bay thương mại, hệ thống cáng đáp và kết cấu nội thất.",
            app1: "Cánh tuabin",
            app2: "Bộ phận cáng đáp",
            app3: "Giá đỡ kết cấu"
          },
          {
            title: "Ô tô & Xe điện",
            subtitle: "Tiêu chuẩn IATF 16949",
            description: "Hỗ trợ chuyển đổi sang Xe điện với các linh kiện nhôm nhẹ và vỏ động cơ chính xác cao.",
            app1: "Vỏ động cơ EV",
            app2: "Trục truyền động",
            app3: "Vỏ pin"
          },
          {
            title: "Thiết bị Y tế",
            subtitle: "Tuân thủ ISO 13485",
            description: "Sản xuất dụng cụ phẫu thuật và cấy ghép chỉnh hình sử dụng Titan và Thép không gỉ cấp y tế.",
            app1: "Dụng cụ phẫu thuật",
            app2: "Cấy ghép chỉnh hình",
            app3: "Thiết bị chẩn đoán"
          }
        ]
      },
      supplyChain: {
        sub: "Hơn cả Sản xuất",
        titleLine1: "Chúng tôi Vận hành",
        titleLine2: "Chuỗi Cung ứng Toàn cầu",
        desc: "VAACA không chỉ cung cấp linh kiện, mà là một hệ sinh thái. Chúng tôi quản lý nguồn cung ứng, kiểm toán và hậu cần.",
        steps: [
          {
            title: "Đánh giá NCC",
            desc: "Đánh giá nghiêm ngặt nhà cung cấp."
          },
          {
            title: "Kiểm toán Quy trình",
            desc: "Xác minh tại chỗ các giao thức."
          },
          {
            title: "Quản lý Rủi ro",
            desc: "Chủ động xác định điểm nghẽn."
          },
          {
            title: "Truy xuất Số",
            desc: "Theo dõi vòng đời đầy đủ."
          }
        ],
        stats: {
          delivery: "Giao hàng Đúng hạn",
          defect: "Tỷ lệ lỗi",
          cycle: "Chu kỳ Sản xuất",
          status: "Trạng thái NCC"
        }
      },
      footer: {
        explore: "Khám phá",
        contact: "Liên hệ",
        address: "Lô C4, Khu Công nghệ cao,<br />TP. Hồ Chí Minh, Việt Nam.",
        rights: "© 2024 VAACA. Bảo lưu mọi quyền."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
