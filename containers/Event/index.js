import React from 'react';
import { FormattedMessage } from 'react-intl';

import Box from '@livipdev/core/Box';
import Button from '@livipdev/core/Button';
import Grid from '@livipdev/core/Grid';
import Typography from '@livipdev/core/Typography';
import Carousel from '@livipdev/core/Carousel';
import EventList from '@livipdev/core/EventList';
import Title from '@livipdev/core/Title';
import { SCREEN_SIZES } from '@livipdev/core/styles/theme/constants';

import { styled } from '@material-ui/core/styles';

import event from './mockedAPI.json';
import messages from './messages';
import Layout from '../Layout';
import EventHighlight from '../../components/EventHighlight';
import ServicesIncluded from '../../components/ServicesIncluded';
import Section from '../../components/Section';

const GridWithBackground = styled(Grid)({
  backgroundImage: (props) => `url(${props.background})`,
  backgroundSize: 'calc(50% - 16px) 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right',
});

const ExperienceCard = styled(Box)({
  backgroundImage: (props) => `url(${props.background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const Event = () => (
  <Layout>
    <EventHighlight
      title={event.name}
      description={messages.banner}
      background={event.cover_url}
    />

    <Section noGutter noContainer>
      <Section component="div" textAlign="center">
        <Typography variant="h2" message={messages.event} gutterBottom />
        <Typography variant="subtitle1" color="textSecondary">
          {event.short_description}
        </Typography>
      </Section>
      <Section component="div" bgcolor="grey.background" noGutter>
        <Box component={GridWithBackground} py={7} container background={event.about.cover_url}>
          <Grid item lg={6}>
            <Typography variant="h2" gutterBottom>
              {event.about.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              <div dangerouslySetInnerHTML={{ __html: event.about.description }} />
            </Typography>
            <Button variant="contained" color="primary">
              <FormattedMessage {...messages.button} />
            </Button>
          </Grid>
        </Box>
      </Section>
    </Section>

    <Section noGutter>
      <Section component="div" textAlign="center">
        <Typography variant="h2" message={messages.attractions} gutterBottom />
        <Typography variant="body1" color="textSecondary">
          {event.attractions.description}
        </Typography>
      </Section>
      <Carousel
        infinite
        responsive
        slidesPerPage={3}
      >
        {
          event.attractions.suggested.map((suggestion) => (
            <ExperienceCard width="420px" height="320px" display="flex" alignItems="flex-end" background={suggestion.cover_url} py={3} px={4} color="common.white">
              <div>
                <Typography variant="subtitle2">{suggestion.name}</Typography>
                <Typography variant="body1">{suggestion.description}</Typography>
              </div>
            </ExperienceCard>
          ))
        }
      </Carousel>
    </Section>

    <Section textAlign="center">
      <Typography variant="h2" gutterBottom message={{ ...messages.nearby, values: { city: event.city } }} />
      <EventList events={event.nearby.events} />
    </Section>

    <Box pt={7}>
      <ServicesIncluded />
    </Box>

    <Section bgcolor="grey.background">
      <Title
        title={{
          variant: 'h2',
          message: messages.otherEvents,
        }}
        subtitle={{
          variant: 'subtitle1',
          message: messages.otherEventsSubtitle,
        }}
        maxWidth={SCREEN_SIZES.SMALL}
        align="center"
      />
      <EventList events={event.other.events} />
    </Section>
  </Layout>
);

export default Event;