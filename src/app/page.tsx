import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Message from "@/components/Message";
import Artists from "@/components/Artists";
import GroupPhoto from "@/components/GroupPhoto";
import InvitationRewards from "@/components/InvitationRewards";
import EventInfo from "@/components/EventInfo";
import AchievementProgress from "@/components/AchievementProgress";
import TicketCta from "@/components/TicketCta";
import FollowUs from "@/components/FollowUs";
import StandFlowerInfo from "@/components/StandFlowerInfo";
import Footer from "@/components/Footer";
import FloatingTicketCta from "@/components/FloatingTicketCta";

export default function Page() {
  return (
    <main>
      <Hero />
      <Message />
      <Artists />
      <GroupPhoto />
      <FollowUs />
      <Countdown />
      <InvitationRewards />
      <EventInfo />
      <AchievementProgress />
      <TicketCta />
      <StandFlowerInfo />
      <Footer />

      {/* 右下に常時表示されるチケット購入ボタン */}
      <FloatingTicketCta />
    </main>
  );
}
