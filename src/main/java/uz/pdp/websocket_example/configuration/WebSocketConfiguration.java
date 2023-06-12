package uz.pdp.websocket_example.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
//bu anatatsiya socket orqali xabarlarni qabul qilish va
// clientlarga xabarni yuborishni sozlaydi
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //bu method clientlar uchun endpointni yaratadi va client lar shu
        // endpointga ulanishi mumkin
        registry.addEndpoint("/websocket-chat").withSockJS();
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //bu method faqat /chat yo'lidagi xabarlarni ushlaydi. Yani faqat /chat yo'li bilan
        //boshlanadigan yo'llarga azo bo'lgan client larga xabar yubora oladi
        registry.enableSimpleBroker("/chat");
        //bu method client lar tomonidan serverga yuboriladigan so'rovlarga /app prefiksini qo'yadi
        registry.setApplicationDestinationPrefixes("/app");
    }
}
