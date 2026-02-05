import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Plans
  const freePlan = await prisma.plan.upsert({
    where: { slug: "free" },
    update: {},
    create: {
      name: "Free",
      slug: "free",
      price: 0,
      features: [
        "Até 5 usuários",
        "1GB de armazenamento",
        "Suporte por email",
        "Relatórios básicos",
      ],
      maxUsers: 5,
    },
  });

  const proPlan = await prisma.plan.upsert({
    where: { slug: "pro" },
    update: {},
    create: {
      name: "Pro",
      slug: "pro",
      price: 49.9,
      features: [
        "Até 25 usuários",
        "10GB de armazenamento",
        "Suporte prioritário",
        "Relatórios avançados",
        "API access",
        "Integrações",
      ],
      maxUsers: 25,
      isPopular: true,
    },
  });

  const enterprisePlan = await prisma.plan.upsert({
    where: { slug: "enterprise" },
    update: {},
    create: {
      name: "Enterprise",
      slug: "enterprise",
      price: 199.9,
      features: [
        "Usuários ilimitados",
        "Armazenamento ilimitado",
        "Suporte 24/7",
        "Relatórios customizados",
        "API access ilimitado",
        "Integrações customizadas",
        "SLA garantido",
        "Gerente de conta dedicado",
      ],
      maxUsers: -1,
    },
  });

  console.log("✅ Plans created");

  // Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Leonardo Silva",
      email: "admin@example.com",
      password: hashedPassword,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leonardo",
      role: "ADMIN",
      status: "ACTIVE",
      planId: enterprisePlan.id,
    },
  });

  // Create sample users
  const users = [
    { name: "Maria Santos", email: "maria@example.com", planId: proPlan.id, role: "EDITOR" as const },
    { name: "João Oliveira", email: "joao@example.com", planId: freePlan.id, role: "USER" as const },
    { name: "Ana Costa", email: "ana@example.com", planId: freePlan.id, role: "USER" as const, status: "INACTIVE" as const },
    { name: "Pedro Almeida", email: "pedro@example.com", planId: proPlan.id, role: "EDITOR" as const },
    { name: "Carla Mendes", email: "carla@example.com", planId: proPlan.id, role: "USER" as const },
    { name: "Ricardo Ferreira", email: "ricardo@example.com", planId: enterprisePlan.id, role: "ADMIN" as const },
    { name: "Juliana Lima", email: "juliana@example.com", planId: freePlan.id, role: "USER" as const, status: "INACTIVE" as const },
    { name: "Bruno Nascimento", email: "bruno@example.com", planId: proPlan.id, role: "USER" as const },
    { name: "Fernanda Souza", email: "fernanda@example.com", planId: proPlan.id, role: "EDITOR" as const },
    { name: "Gabriel Rocha", email: "gabriel@example.com", planId: freePlan.id, role: "USER" as const },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.split(" ")[0]}`,
        role: user.role,
        status: user.status || "ACTIVE",
        planId: user.planId,
      },
    });
  }

  console.log("✅ Users created");

  // Create Projects
  const projects = [
    { name: "E-commerce Platform", description: "Desenvolvimento de plataforma de vendas online", status: "ACTIVE" as const, progress: 75, teamSize: 5 },
    { name: "Mobile App", description: "Aplicativo mobile para iOS e Android", status: "ACTIVE" as const, progress: 45, teamSize: 4 },
    { name: "Dashboard Analytics", description: "Painel de análise de dados", status: "COMPLETED" as const, progress: 100, teamSize: 3 },
    { name: "API Integration", description: "Integração com APIs externas", status: "ON_HOLD" as const, progress: 30, teamSize: 2 },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log("✅ Projects created");
  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
