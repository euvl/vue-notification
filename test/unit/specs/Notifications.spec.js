import { mount } from 'avoriaz';
import Notifications from '../../../src/Notifications.vue';
import CssGroup from '../../../src/CssGroup.vue';
import VelocityGroup from '../../../src/VelocityGroup.vue';

describe('Notifications', () => {
  describe('defaults', () => {
    it('has correct default props', () => {
      const wrapper = mount(Notifications);

      expect(wrapper.vm.$props.width).to.eq(300);
      expect(wrapper.vm.$props.reverse).to.eq(false);
      expect(wrapper.vm.$props.position).to.deep.eq(['top', 'right']);
      expect(wrapper.vm.$props.classes).to.eq('vue-notification');
      expect(wrapper.vm.$props.animationType).to.eq('css');
      expect(wrapper.vm.$props.animation.enter).to.exist;
      expect(wrapper.vm.$props.animation.leave).to.exist;
      expect(wrapper.vm.$props.speed).to.eq(300);
      expect(wrapper.vm.$props.duration).to.eq(3000);
      expect(wrapper.vm.$props.delay).to.eq(0);
    });

    it('list is empty', () => {
      const wrapper = mount(Notifications);

      expect(wrapper.data().list).to.deep.eq([]);
    });
  });

  describe('methods', ()=> {
    describe('addItem', () => {
      describe('when no group', () => {
        it('adds item to list', () => {
          const wrapper = mount(Notifications);

          const event = {
            title: 'Title',
            text: 'Text',
            type: 'success',
          };

          const result = wrapper.vm.addItem(event);

          expect(wrapper.data().list.length).to.eq(1);
          expect(wrapper.data().list[0].id).to.exist;
          expect(wrapper.data().list[0].title).to.eq('Title');
          expect(wrapper.data().list[0].text).to.eq('Text');
          expect(wrapper.data().list[0].type).to.eq('success');
          expect(wrapper.data().list[0].state).to.eq(0);
          expect(wrapper.data().list[0].speed).to.eq(300);
          expect(wrapper.data().list[0].length).to.eq(3600);
          expect(wrapper.data().list[0].timer).to.exist;
        });
      });

      describe('when a group is defined and matches event group name', () => {
        it('adds item to list', () => {
          const propsData = {
            group: 'Group',
          };

          const wrapper = mount(Notifications, { propsData });

          const event = {
            group: 'Group',
            title: 'Title',
            text: 'Text',
            type: 'success',
          };

          const result = wrapper.vm.addItem(event);

          expect(wrapper.data().list.length).to.eq(1);
          expect(wrapper.data().list[0].id).to.exist;
          expect(wrapper.data().list[0].title).to.eq('Title');
          expect(wrapper.data().list[0].text).to.eq('Text');
          expect(wrapper.data().list[0].type).to.eq('success');
          expect(wrapper.data().list[0].state).to.eq(0);
          expect(wrapper.data().list[0].speed).to.eq(300);
          expect(wrapper.data().list[0].length).to.eq(3600);
          expect(wrapper.data().list[0].timer).to.exist;
        });
      });

      describe('when a group is defined and does not match event group name', () => {
        it('does not add item to list', () => {
          const propsData = {
            group: 'Does Not Match',
          };

          const wrapper = mount(Notifications, { propsData });

          const event = {
            group: 'Group',
            title: 'Title',
            text: 'Text',
            type: 'success',
          };

          const result = wrapper.vm.addItem(event);

          expect(wrapper.data().list.length).to.eq(0);
        });
      });

      describe('item property overrides', () => {
        it('item length calculated from duration and speed props', () => {
          const duration = 50;
          const speed = 25;
          const expectedLength = duration + 2 * speed;

          const propsData = {
            duration,
            speed,
          };

          const wrapper = mount(Notifications, { propsData });

          const event = {
            group: 'Group',
            title: 'Title',
            text: 'Text',
            type: 'success',
          };

          const result = wrapper.vm.addItem(event);

          expect(wrapper.data().list.length).to.eq(1);
          expect(wrapper.data().list[0].speed).to.eq(speed);
          expect(wrapper.data().list[0].length).to.eq(expectedLength);
        });
      });

      describe('order of inserted items', () => {
        it('by default inserts items in reverse order', () => {
          const wrapper = mount(Notifications);

          const event1 = {
            title: 'First',
          };

          const event2 = {
            title: 'Second',
          };

          wrapper.vm.addItem(event1);
          wrapper.vm.addItem(event2);

          expect(wrapper.data().list.length).to.eq(2);
          expect(wrapper.data().list[0].title).to.eq('Second');
          expect(wrapper.data().list[1].title).to.eq('First');
        });

        it('when position is top and reverse is false, inserts in reverse order', () => {
          const propsData = {
            position: 'top right',
            reverse: false,
          };

          const wrapper = mount(Notifications, { propsData });

          const event1 = {
            title: 'First',
          };

          const event2 = {
            title: 'Second',
          };

          wrapper.vm.addItem(event1);
          wrapper.vm.addItem(event2);

          expect(wrapper.data().list.length).to.eq(2);
          expect(wrapper.data().list[0].title).to.eq('Second');
          expect(wrapper.data().list[1].title).to.eq('First');
        });

        it('when position is top and reverse is true, inserts in sequential order', () => {
          const propsData = {
            position: 'top right',
            reverse: true,
          };

          const wrapper = mount(Notifications, { propsData });

          const event1 = {
            title: 'First',
          };

          const event2 = {
            title: 'Second',
          };

          wrapper.vm.addItem(event1);
          wrapper.vm.addItem(event2);

          expect(wrapper.data().list.length).to.eq(2);
          expect(wrapper.data().list[0].title).to.eq('First');
          expect(wrapper.data().list[1].title).to.eq('Second');
        });

        it('when position is bottom and reverse is false, inserts in sequential order', () => {
          const propsData = {
            position: 'bottom right',
            reverse: false,
          };

          const wrapper = mount(Notifications, { propsData });

          const event1 = {
            title: 'First',
          };

          const event2 = {
            title: 'Second',
          };

          wrapper.vm.addItem(event1);
          wrapper.vm.addItem(event2);

          expect(wrapper.data().list.length).to.eq(2);
          expect(wrapper.data().list[0].title).to.eq('First');
          expect(wrapper.data().list[1].title).to.eq('Second');
        });

        it('when position is bottom and reverse is true, inserts in reverse order', () => {
          const propsData = {
            position: 'bottom right',
            reverse: true,
          };

          const wrapper = mount(Notifications, { propsData });

          const event1 = {
            title: 'First',
          };

          const event2 = {
            title: 'Second',
          };

          wrapper.vm.addItem(event1);
          wrapper.vm.addItem(event2);

          expect(wrapper.data().list.length).to.eq(2);
          expect(wrapper.data().list[0].title).to.eq('Second');
          expect(wrapper.data().list[1].title).to.eq('First');
        });
      });

      describe('auto-destroy of items', () => {
        it('item is destroyed after certain duration', () => {
          const duration = 50;
          const speed = 25;
          const expectedLength = duration + 2 * speed;

          const propsData = {
            duration,
            speed,
          };

          const clock = sinon.useFakeTimers();

          const wrapper = mount(Notifications, { propsData });

          const event = {
            group: 'Group',
            title: 'Title',
            text: 'Text',
            type: 'success',
          };

          const result = wrapper.vm.addItem(event);

          expect(wrapper.data().list.length).to.eq(1);

          clock.tick(expectedLength);

          expect(wrapper.data().list.length).to.eq(0);

          clock.restore();
        });
      });
    });
  });

  describe('rendering', () => {
    describe('notification wrapper', () => {
      it('adds notification item with correct title and text', (done) => {
        const wrapper = mount(Notifications);

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        wrapper.vm.addItem(event);

        wrapper.vm.$nextTick(() => {
          const notifications = wrapper.find('.notification-wrapper');

          expect(notifications.length).to.eq(1);

          const title = wrapper.first('.notification-title').text();
          expect(title).to.eq('Title');

          const text = wrapper.first('.notification-content').text();
          expect(text).to.eq('Text');

          done();
        });
      });

      it('adds notification with correct inline styling', (done) => {
        const wrapper = mount(Notifications);

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        wrapper.vm.addItem(event);

        wrapper.vm.$nextTick(() => {
          const notification = wrapper.first('.notification-wrapper');

          expect(notification).to.exist;
          expect(notification.element.style.transition).to.eq('all 300ms');

          done();
        });
      });

      it('adds the event type as css class body', (done) => {
        const wrapper = mount(Notifications);

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        wrapper.vm.addItem(event);

        wrapper.vm.$nextTick(() => {
          const notification = wrapper.first('.notification-wrapper > div');

          expect(notification).to.exist;
          expect(notification.element.className).includes('notification')
          expect(notification.element.className).includes('vue-notification')
          expect(notification.element.className).includes('success')

          done();
        });
      });

      it('has correct default body classes', (done) => {
        const wrapper = mount(Notifications);

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        wrapper.vm.addItem(event);

        wrapper.vm.$nextTick(() => {
          const notification = wrapper.first('.notification-wrapper > div');

          expect(notification).to.exist;
          expect(notification.element.className).includes('vue-notification')

          done();
        });
      });

      it('body classes can be customized via prop', (done) => {
        const propsData = {
          classes: 'pizza taco-sushi'
        };

        const wrapper = mount(Notifications, { propsData });

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        wrapper.vm.addItem(event);

        wrapper.vm.$nextTick(() => {
          const notification = wrapper.first('.notification-wrapper > div');

          expect(notification).to.exist;
          expect(notification.element.className).includes('pizza');
          expect(notification.element.className).includes('taco-sushi');

          done();
        });
      });
    });

    describe('transition wrapper', () => {
      it('default is css transition', () => {
        const wrapper = mount(Notifications);

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        expect(wrapper.find(CssGroup).length).to.eq(1);
        expect(wrapper.find(VelocityGroup).length).to.eq(0);
      });

      it('uses using velocity transition when enabled via prop', () => {
        const propsData = {
          animationType: 'velocity',
        };

        const wrapper = mount(Notifications, { propsData });

        const event = {
          title: 'Title',
          text: 'Text',
          type: 'success',
        };

        expect(wrapper.find(CssGroup).length).to.eq(0);
        expect(wrapper.find(VelocityGroup).length).to.eq(1);
      });
    });
  });

  describe('with velocity animation library', () => {
    const velocity = sinon.stub();
    Notifications.configure({ velocity });

    it('applies no additional inline styling to notification', (done) => {
      const propsData = {
        animationType: 'velocity',
      };

      const wrapper = mount(Notifications, { propsData });

      const event = {
        title: 'Title',
        text: 'Text',
        type: 'success',
      };

      wrapper.vm.addItem(event);

      wrapper.vm.$nextTick(() => {
        const notification = wrapper.first('.notification-wrapper');

        expect(notification).to.exist;
        expect(notification.element.style.transition).to.eq('');

        done();
      });
    });

    it('adds item to list', () => {
      const propsData = {
        animationType: 'velocity',
      };

      const wrapper = mount(Notifications, { propsData });

      const event = {
        title: 'Title',
        text: 'Text',
        type: 'success',
      };

      const result = wrapper.vm.addItem(event);

      expect(wrapper.data().list.length).to.eq(1);
      expect(wrapper.data().list[0].id).to.exist;
      expect(wrapper.data().list[0].title).to.eq('Title');
      expect(wrapper.data().list[0].text).to.eq('Text');
      expect(wrapper.data().list[0].type).to.eq('success');
      expect(wrapper.data().list[0].state).to.eq(0);
      expect(wrapper.data().list[0].speed).to.eq(300);
      expect(wrapper.data().list[0].length).to.eq(3600);
      expect(wrapper.data().list[0].timer).to.exist;
    });

    it('calls velocity service for animations', () => {
      const duration = 50;
      const speed = 25;
      const expectedLength = duration + 2 * speed;

      const propsData = {
        animationType: 'velocity',
        duration,
        speed,
      };

      const wrapper = mount(Notifications, { propsData });

      const event = {
        group: 'Group',
        title: 'Title',
        text: 'Text',
        type: 'success',
      };

      const result = wrapper.vm.addItem(event);

      expect(velocity.called).to.eq(true);
    });
  });
});
